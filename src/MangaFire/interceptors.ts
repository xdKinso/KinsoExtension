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
    // Check for Cloudflare challenge
    if (response.status === 503 || response.status === 403) {
      const htmlStr = Application.arrayBufferToUTF8String(data);
      if (htmlStr.includes('cloudflare') || htmlStr.includes('cf-browser-verification')) {
        throw new CloudflareError(request);
      }
    }
    return data;
  }
}
