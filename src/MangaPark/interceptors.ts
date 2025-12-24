import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";
import { generateBrowserHeaders } from "./browserHeaders";

// Priority ordered server list based on user reports and testing (most reliable first)
// Order: s00, s01, s03, s04, then remaining servers. s07 moved to end due to frequent 503 errors
const CDN_SERVERS = ['s00', 's01', 's03', 's04', 's05', 's06', 's08', 's09', 's10', 's02', 's07'];

// Regex to match CDN server pattern in URLs
const SERVER_PATTERN = /https:\/\/s\d{2}/;

// Track failed servers to avoid repeated attempts
const failedServers = new Set<string>();

// Track URLs that have been retried to prevent infinite loops
const urlRetryMap = new Map<string, string[]>();

// Get server ID from URL (e.g., "s01", "s03")
function getServerFromUrl(url: string): string | null {
  const match = url.match(/https:\/\/(s\d{2})\./);
  return match?.[1] ?? null;
}

// Replace server in URL
function replaceServer(url: string, newServer: string): string {
  return url.replace(SERVER_PATTERN, `https://${newServer}`);
}

// Get next working server from priority list
function getNextWorkingServer(currentServer?: string): string {
  // Try servers in priority order, skipping failed ones
  for (const server of CDN_SERVERS) {
    if (!failedServers.has(server) && server !== currentServer) {
      return server;
    }
  }
  // If all servers tried, clear failed list and start over
  failedServers.clear();
  return CDN_SERVERS[0] ?? 's01';
}

// Get next untried server for a URL (for actual retries)
function getNextUntriedServer(mediaPath: string, triedServers: string[]): string | null {
  for (const server of CDN_SERVERS) {
    if (!triedServers.includes(server)) {
      return server;
    }
  }
  return null; // All servers tried
}

// Check if URL is a CDN image request
function isCDNImageUrl(url: string): boolean {
  return SERVER_PATTERN.test(url) && url.includes('/media/');
}

export class Interceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    // Apply image fallback for CDN requests
    if (isCDNImageUrl(request.url)) {
      const currentServer = getServerFromUrl(request.url);
      if (currentServer && failedServers.has(currentServer)) {
        // This server has failed before, try next available
        const newServer = getNextWorkingServer(currentServer);
        request.url = replaceServer(request.url, newServer);
        console.log(`[MangaPark] Proactively switching from ${currentServer} to ${newServer}`);
      }
    }

    // Generate realistic browser-like headers with random user agent rotation
    const browserHeaders = generateBrowserHeaders(request.url);
    
    // Merge with any existing headers (cookies, etc.)
    request.headers = {
      ...request.headers,
      ...browserHeaders,
    };

    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Log Cloudflare errors for debugging
    if (response.status === 523) {
      console.error(`[MangaPark] 523 Origin Unreachable for: ${request.url}`);
      console.error(`[MangaPark] This usually means rate limiting is too aggressive or origin is down`);
      console.error(`[MangaPark] Current rate limit: 1 request every 3 seconds`);
    } else if (response.status === 522) {
      console.error(`[MangaPark] 522 Connection Timed Out for: ${request.url}`);
    } else if (response.status === 521) {
      console.error(`[MangaPark] 521 Web Server Down for: ${request.url}`);
    } else if (response.status === 520) {
      console.error(`[MangaPark] 520 Unknown Error for: ${request.url}`);
    }

    // Track failed CDN servers
    if (isCDNImageUrl(request.url)) {
      const currentServer = getServerFromUrl(request.url);
      
      // Only mark server as failed on actual server errors (5xx), not on 404 "not found"
      // 404 just means this particular image isn't on this server, not that the server is down
      if ((response.status >= 500 || data.byteLength === 0) && currentServer) {
        failedServers.add(currentServer);
        console.log(`[MangaPark] Server ${currentServer} marked as failed (status: ${response.status})`);
      }
      
      // For 404s and other 4xx errors, just track that this server doesn't have this image
      if (response.status === 404 && currentServer) {
        // Extract media path from URL
        const mediaPath = request.url.replace(SERVER_PATTERN, '').substring(8);
        const retryKey = mediaPath;
        const triedServers = urlRetryMap.get(retryKey) || [];
        triedServers.push(currentServer);
        urlRetryMap.set(retryKey, triedServers);
        console.log(`[MangaPark] Image not on ${currentServer}, will try next server`);
      } else if (response.status === 200 && currentServer) {
        // Success - clear retry tracking for this URL
        const mediaPath = request.url.replace(SERVER_PATTERN, '').substring(8);
        urlRetryMap.delete(mediaPath);
        console.log(`[MangaPark] Successfully loaded from ${currentServer}`);
      }
    }
    
    return data;
  }
}

// Export helper functions for use in main.ts
export { getServerFromUrl, replaceServer, getNextWorkingServer, getNextUntriedServer, isCDNImageUrl, SERVER_PATTERN, CDN_SERVERS, failedServers, urlRetryMap };
