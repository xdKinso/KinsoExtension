import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// CDN server fallback configuration
const CDN_SERVERS = ['s01', 's03', 's05', 's06', 's00', 's04'];
const CDN_HOST_REGEX = /^https:\/\/(s\d+)\./;
const deadServers = new Set<string>();

function getServerFromUrl(url: string): string | null {
  const match = url.match(CDN_HOST_REGEX);
  return match?.[1] ?? null;
}

function replaceServer(url: string, newServer: string): string {
  return url.replace(CDN_HOST_REGEX, `https://${newServer}.`);
}

function getNextWorkingServer(): string {
  const working = CDN_SERVERS.find(s => !deadServers.has(s));
  return working ?? CDN_SERVERS[0] ?? 's01';
}

export class Interceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    const headers: Record<string, string> = {
      ...request.headers,
      "user-agent": await Application.getDefaultUserAgent(),
    };

    // For CDN image requests, set proper referer
    if (request.url.includes('/media/') || request.url.includes('mpmok.org')) {
      headers.referer = 'https://mangapark.io/';
      headers.accept = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8';
      
      // Apply CDN server fallback if needed
      const currentServer = getServerFromUrl(request.url);
      if (currentServer && deadServers.has(currentServer)) {
        const workingServer = getNextWorkingServer();
        request.url = replaceServer(request.url, workingServer);
      }
    } else {
      headers.referer = 'https://mangapark.io/';
      headers.cookie = 'nsfw=2';
    }

    request.headers = headers;
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Detect failed image requests and mark server as dead
    if ((request.url.includes('/media/') || request.url.includes('mpmok.org')) && 
        (response.status === 404 || response.status === 403 || response.status === 500)) {
      const failedServer = getServerFromUrl(request.url);
      if (failedServer) {
        deadServers.add(failedServer);
        
        // Automatically retry with next working server
        const workingServer = getNextWorkingServer();
        const retryUrl = replaceServer(request.url, workingServer);
        
        throw new Error(`CDN server ${failedServer} failed, retry with: ${retryUrl}`);
      }
    }
    
    return data;
  }
}
