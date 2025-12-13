export class URLBuilder {
  private baseUrl: string;
  private path: string[] = [];
  private queryParams: URLSearchParams;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.queryParams = new URLSearchParams();
  }

  addPath(path: string): this {
    this.path.push(path);
    return this;
  }

  addQuery(key: string, value: string): this {
    this.queryParams.append(key, value);
    return this;
  }

  build(): string {
    const pathString = this.path.length > 0 ? '/' + this.path.join('/') : '';
    const queryString = this.queryParams.toString();
    return `${this.baseUrl}${pathString}${queryString ? '?' + queryString : ''}`;
  }
}
