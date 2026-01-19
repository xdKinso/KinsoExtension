import { 
  BasicRateLimiter, 
  PaperbackInterceptor,
  type Request,
  type Response
} from "@paperback/types";

export const DOMAIN = "https://www.mangago.me";

export const rateLimiter = new BasicRateLimiter("MangaGoRateLimiter", {
  numberOfRequests: 10,
  bufferInterval: 2000,
  ignoreImages: false,
});

export class MangaGoInterceptor extends PaperbackInterceptor {
  override async interceptResponse(request: Request, response: Response, data: ArrayBuffer): Promise<ArrayBuffer> {
    void request;
    void response;
    return data;
  }

  override async interceptRequest(request: Request): Promise<Request> {
    request.headers = {
      ...(request.headers ?? {}),
      referer: DOMAIN,
      origin: DOMAIN,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    };
    return request;
  }
}
