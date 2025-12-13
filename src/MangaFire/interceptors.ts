import { CloudflareError, PaperbackInterceptor, type Request, type Response } from "@paperback/types";

export class FireInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    request.headers = {
      ...request.headers,
      referer: `https://mangafire.to/`,
      "user-agent": await Application.getDefaultUserAgent(),
    };
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    // Only throw CloudflareError if we actually detect Cloudflare challenge
    if (response.status === 403 || response.status === 503) {
      const htmlStr = Application.arrayBufferToUTF8String(data);
      // Check for actual Cloudflare challenge page indicators
      if (
        htmlStr.includes('__cf_chl_tk') || 
        htmlStr.includes('cf-challenge-running') ||
        htmlStr.includes('Checking your browser') ||
        htmlStr.includes('ray ID')
      ) {
        throw new CloudflareError(request);
      }
    }
    return data;
  }
}
