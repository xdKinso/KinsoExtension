import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";
import { generateBrowserHeaders } from "../MangaPark/browserHeaders";

const baseUrl = "https://demonicscans.org";

export class Interceptor extends PaperbackInterceptor {
  constructor(id: string) {
    super(id);
  }

  override async interceptRequest(request: Request): Promise<Request> {
    const headers = generateBrowserHeaders(request.url);
    // Add Referer header for better compatibility (matches Keiyoushi implementation)
    request.headers = { 
      ...headers, 
      "Referer": `${baseUrl}/`,
      ...request.headers 
    };
    return request;
  }

  override async interceptResponse(
    _request: Request,
    _response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}
