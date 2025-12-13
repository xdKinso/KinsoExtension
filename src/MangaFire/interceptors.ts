import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

export class FireInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    const isAjaxEndpoint = request.url.includes('/ajax/') || request.url.includes('/filter');
    
    request.headers = {
      ...request.headers,
      referer: `https://mangafire.to/`,
      "user-agent": await Application.getDefaultUserAgent(),
    };
    
    // Only add AJAX headers for AJAX/filter endpoints
    if (isAjaxEndpoint) {
      request.headers = {
        ...request.headers,
        origin: `https://mangafire.to`,
        "x-requested-with": "XMLHttpRequest",
        accept: "application/json, text/javascript, */*; q=0.01",
      };
    }
    
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}
