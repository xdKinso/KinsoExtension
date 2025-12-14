import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// CDN server priority list based on userscript recommendations
const CDN_SERVERS = ['s01', 's03', 's05', 's06', 's00', 's04', 's02', 's07', 's08', 's09', 's10'];
const CDN_HOST_REGEX = /^https:\/\/(s\d{1,2})\./;
const CDN_DOMAINS = [
  'mpfip.org', 'mpizz.org', 'mpmok.org', 'mpqom.org', 'mpqsc.org',
  'mprmm.org', 'mpubn.org', 'mpujj.org', 'mpvim.org', 'mpypl.org',
  'mpcdn.org'
];

// Track which server we're currently using globally
let currentServerIndex = 0;
let consecutiveFailures = 0;
const MAX_FAILURES_BEFORE_SWITCH = 3;

export function getCurrentServer(): string {
  return CDN_SERVERS[currentServerIndex] ?? 's01';
}

export function switchToNextServer(): void {
  currentServerIndex = (currentServerIndex + 1) % CDN_SERVERS.length;
  consecutiveFailures = 0;
  console.log(`[MangaPark] Switched to CDN server: ${getCurrentServer()}`);
}

export function recordFailure(): void {
  consecutiveFailures++;
  if (consecutiveFailures >= MAX_FAILURES_BEFORE_SWITCH) {
    switchToNextServer();
  }
}

export function recordSuccess(): void {
  consecutiveFailures = 0;
}

function isCDNRequest(url: string): boolean {
  return url.includes('/media/') || CDN_DOMAINS.some(domain => url.includes(domain));
}

export class Interceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    // Fix MangaPark CDN server issue: use current working server
    if (request.url.match(/https:\/\/s\d{1,2}\./)) {
      const currentServer = getCurrentServer();
      request.url = request.url.replace(/https:\/\/s\d{1,2}\./, `https://${currentServer}.`);
    }

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
    if (isCDNRequest(request.url)) {
      if (response.status === 521 || response.status === 522 || response.status === 523) {
        recordFailure();
        return new ArrayBuffer(0);
      }
      
      if (response.status === 404 || response.status === 403 || response.status === 500 || response.status === 503 || data.byteLength === 0) {
        recordFailure();
      } else if (response.status === 200 && data.byteLength > 0) {
        recordSuccess();
      }
    }
    
    return data;
  }
}
