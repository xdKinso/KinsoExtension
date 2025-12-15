import type { Request, Response, RequestInterceptor, ResponseInterceptor } from '@paperback/types';
import { generateBrowserHeaders } from '../MangaPark/browserHeaders';

export const requestInterceptor: RequestInterceptor = async (request: Request): Promise<Request> => {
    const headers = generateBrowserHeaders(request.url);
    
    request.headers = {
        ...headers,
        ...request.headers,
    };

    return request;
};

export const responseInterceptor: ResponseInterceptor = async (request: Request, response: Response): Promise<Response> => {
    // Log any errors for debugging
    if (response.status >= 400) {
        console.log(`[MangaDemon] HTTP ${response.status} for ${request.url}`);
    }

    return response;
};
