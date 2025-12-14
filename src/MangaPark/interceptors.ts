import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// CDN server fallback configuration - includes all known servers
const CDN_SERVERS = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's00'];
const CDN_HOST_REGEX = /^https:\/\/(s\d+)\./;
const CDN_DOMAINS = [
  'mpfip.org', 'mpizz.org', 'mpmok.org', 'mpqom.org', 'mpqsc.org',
  'mprmm.org', 'mpubn.org', 'mpujj.org', 'mpvim.org', 'mpypl.org',
  'mpcdn.org'
];
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
    // Merge headers instead of replacing to preserve cookies
    request.headers = {
      ...request.headers,
      "user-agent": await Application.getDefaultUserAgent(),
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "dnt": "1",
      "referer": "https://mangapark.net/",
    };

    // For CDN image requests, set proper headers
    if (isCDNRequest(request.url)) {
      request.headers.accept = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8';
      request.headers["sec-fetch-dest"] = "image";
      
      // Apply CDN server fallback if needed
      const currentServer = getServerFromUrl(request.url);
      if (currentServer && deadServers.has(currentServer)) {
        const workingServer = getNextWorkingServer();
        request.url = replaceServer(request.url, workingServer);
      }
    }

    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Check for Cloudflare server connectivity errors on CDN image requests
    // 521 = Web Server Is Down, 522 = Connection Timed Out, 523 = Origin Unreachable
    if (isCDNRequest(request.url)) {
      if (response.status === 521 || response.status === 522 || response.status === 523) {
        // Log the error but don't throw - let the app show placeholder
        console.log(`[MangaPark] CDN server error ${response.status} for image: ${request.url}`);
        // Return empty buffer to avoid crash
        return new ArrayBuffer(0);
      }
      
      // Detect failed image requests and mark server as dead for future requests
      if (response.status === 404 || response.status === 403 || response.status === 500 || response.status === 503) {
        const failedServer = getServerFromUrl(request.url);
        if (failedServer) {
          deadServers.add(failedServer);
          console.log(`[MangaPark] CDN server ${failedServer} marked as dead. Working servers: ${Array.from(CDN_SERVERS).filter(s => !deadServers.has(s)).join(', ')}`);
        }
      }
    }
    
    return data;
  }
}
