import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// CDN server list - try all servers in order like the bookmarklet does
const CDN_SERVERS = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10'];
const CDN_HOST_REGEX = /^https:\/\/(s\d{1,2})\./;
const CDN_DOMAINS = [
  'mpfip.org', 'mpizz.org', 'mpmok.org', 'mpqom.org', 'mpqsc.org',
  'mprmm.org', 'mpubn.org', 'mpujj.org', 'mpvim.org', 'mpypl.org',
  'mpcdn.org'
];

// Track failed URL patterns to avoid retrying the same broken images
const failedUrls = new Map<string, number>();
let serverRotationIndex = 0;

export function getServerFromUrl(url: string): string | null {
  const match = url.match(CDN_HOST_REGEX);
  return match?.[1] ?? null;
}

export function replaceServer(url: string, newServer: string): string {
  return url.replace(CDN_HOST_REGEX, `https://${newServer}.`);
}

export function getNextServer(currentUrl: string): string | null {
  // Get the base URL path (without server)
  const basePath = currentUrl.replace(/^https:\/\/s\d{1,2}\./, '');
  const failCount = failedUrls.get(basePath) || 0;
  
  // If we've tried too many times, give up
  if (failCount >= CDN_SERVERS.length) {
    return null;
  }
  
  // Try next server in rotation
  const nextIndex = (serverRotationIndex + failCount) % CDN_SERVERS.length;
  failedUrls.set(basePath, failCount + 1);
  
  const server = CDN_SERVERS[nextIndex];
  return server ? server : null;
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
    }

    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Check for errors on CDN image requests
    if (isCDNRequest(request.url)) {
      // Handle Cloudflare connectivity errors
      if (response.status === 521 || response.status === 522 || response.status === 523) {
        console.log(`[MangaPark] CDN server error ${response.status} for image: ${request.url}`);
        return new ArrayBuffer(0);
      }
      
      // For other failures, try next server in rotation
      if (response.status === 404 || response.status === 403 || response.status === 500 || response.status === 503 || data.byteLength === 0) {
        const nextServer = getNextServer(request.url);
        if (nextServer) {
          console.log(`[MangaPark] Image failed, rotating to server ${nextServer}`);
          // Note: Paperback doesn't support automatic retry, so this just logs
          // The app will show placeholder and user can refresh
        }
      }
    }
    
    return data;
  }
}
