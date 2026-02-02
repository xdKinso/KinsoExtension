const BASE_URL = "https://demonicscans.org/";
let cachedUserAgent: string | undefined;

async function getStableUserAgent(): Promise<string> {
  if (!cachedUserAgent) {
    cachedUserAgent = await Application.getDefaultUserAgent();
  }
  return cachedUserAgent;
}

function generateSecChUa(isMobile: boolean): string {
  const chromeVersion = "122";
  if (isMobile) {
    return `"Not A(Brand";v="8", "Chromium";v="${chromeVersion}", "Google Chrome";v="${chromeVersion}"`;
  }
  return `"Not A(Brand";v="99", "Chromium";v="${chromeVersion}", "Google Chrome";v="${chromeVersion}"`;
}

export async function generateBrowserHeadersMangaDemon(
  url: string,
): Promise<Record<string, string>> {
  const userAgent = await getStableUserAgent();
  const isMobile = userAgent.toLowerCase().includes("mobile");
  const isImageRequest = url.includes("/media/") || /\.(jpg|jpeg|png|webp|gif)/.test(url);

  const headers: Record<string, string> = {
    "user-agent": userAgent,
    accept: isImageRequest
      ? "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    referer: BASE_URL,
    origin: BASE_URL,
    dnt: "1",
    "upgrade-insecure-requests": "1",
    "sec-fetch-dest": isImageRequest ? "image" : "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": isImageRequest ? "cross-site" : "same-origin",
    "sec-fetch-user": "?1",
    "cache-control": "max-age=0",
  };

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    headers["sec-ch-ua"] = generateSecChUa(isMobile);
    headers["sec-ch-ua-mobile"] = isMobile ? "?1" : "?0";
    headers["sec-ch-ua-platform"] = isMobile ? '"Android"' : '"Windows"';
  }

  return headers;
}
