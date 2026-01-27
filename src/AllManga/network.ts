/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

import { PaperbackInterceptor, type Request, type Response } from "@paperback/types";

const BASE_URL = "https://allmanga.to";

// Intercepts all the requests and responses and allows you to make changes to them
export class MainInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    const isImageRequest = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(request.url);
    if (!isImageRequest) return request;
    request.headers = {
      ...request.headers,
      referer: BASE_URL,
      origin: BASE_URL,
    };
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    void request;
    void response;

    return data;
  }
}
