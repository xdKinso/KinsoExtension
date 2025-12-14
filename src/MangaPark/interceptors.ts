import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// CDN server fallback configuration - includes all known servers
const CDN_SERVERS = ['s01', 's03', 's05', 's06', 's07', 's10', 's00', 's04'];
const CDN_HOST_REGEX = /^https:\/\/(s\d+)\./;
const CDN_DOMAINS = ['mpmok.org', 'mpqom.org', 'mpcdn.org'];
export const deadServers = new Set<string>();

export function getServerFromUrl(url: string): string | null {
  const match = url.match(CDN_HOST_REGEX);
  return match?.[1] ?? null;
}

export function replaceServer(url: string, newServer: string): string {
  return url.replace(CDN_HOST_REGEX, `https://${newServer}.`);
}

export function getNextWorkingServer(): string {
  const working = CDN_SERVERS.find(s => !deadServers.has(s));
  return working ?? CDN_SERVERS[0] ?? 's01';
}

function isCDNRequest(url: string): boolean {
  return url.includes('/media/') || CDN_DOMAINS.some(domain => url.includes(domain));
}

export class Interceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    const headers: Record<string, string> = {
      ...request.headers,
      "user-agent": await Application.getDefaultUserAgent(),
    };

    // For CDN image requests, set proper referer
    if (isCDNRequest(request.url)) {
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
    // Detect failed image requests and mark server as dead for future requests
    if (isCDNRequest(request.url) && 
        (response.status === 404 || response.status === 403 || response.status === 500 || response.status === 503)) {
      const failedServer = getServerFromUrl(request.url);
      if (failedServer) {
        deadServers.add(failedServer);
        console.log(`CDN server ${failedServer} marked as dead. Working servers: ${Array.from(CDN_SERVERS).filter(s => !deadServers.has(s)).join(', ')}`);
      }
    }
    
    return data;
  }
}
