import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";
import { generateBrowserHeadersMangaDemon } from "./browserHeadersMangaDemon";

const baseUrl = "https://demonicscans.org";

export class Interceptor extends PaperbackInterceptor {
  constructor(id: string) {
    super(id);
  }

  override async interceptRequest(request: Request): Promise<Request> {
    const headers = await generateBrowserHeadersMangaDemon(request.url);
    request.headers = {
      ...headers,
      Referer: `${baseUrl}/`,
      ...request.headers,
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
