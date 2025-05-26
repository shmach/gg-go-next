// biome-ignore lint/suspicious/noExplicitAny: Because the body can be any type.
export interface IHttpRequest<TBody extends Record<string, any> | undefined> {
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface IHttpResponse {
  statusCode: number;
  // biome-ignore lint/suspicious/noExplicitAny: Because the body can be any type.
  body?: Record<string, any>;
  headers?: Record<string, string>;
}
