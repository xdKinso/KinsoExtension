import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

// Priority ordered server list from Mihon extension (most reliable first)
const CDN_SERVERS = ['s01', 's03', 's04', 's00', 's05', 's06', 's07', 's08', 's09', 's10', 's02'];

// Regex to match CDN server pattern in URLs
const SERVER_PATTERN = /https:\/\/s\d{2}/;

// Track failed servers to avoid repeated attempts
const failedServers = new Set<string>();

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
  // If all servers tried, clear failed list and start over with first priority server
  failedServers.clear();
  return CDN_SERVERS[0] ?? 's01';
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
      }
    }

    // Set proper headers (based on Mihon extension)
    request.headers = {
      ...request.headers,
      "user-agent": await Application.getDefaultUserAgent(),
      "accept": isCDNImageUrl(request.url) 
        ? "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
        : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "referer": "https://mangapark.net/",
      "accept-language": "en-US,en;q=0.9",
    };

    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Track failed CDN servers
    if (isCDNImageUrl(request.url)) {
      const currentServer = getServerFromUrl(request.url);
      
      // Mark server as failed on errors or empty responses
      if (response.status >= 400 || data.byteLength === 0) {
        if (currentServer) {
          failedServers.add(currentServer);
          console.log(`[MangaPark] Server ${currentServer} marked as failed (status: ${response.status})`);
        }
      }
    }
    
    return data;
  }
}

// Export helper functions for use in main.ts
export { getServerFromUrl, replaceServer, getNextWorkingServer, isCDNImageUrl, SERVER_PATTERN, CDN_SERVERS, failedServers };
