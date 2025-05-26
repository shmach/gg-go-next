import type { IHttpRequest, IHttpResponse } from "./IHttp";

export interface IController<
  // biome-ignore lint/suspicious/noExplicitAny: Because we want to allow any type for the body
  TBody extends Record<string, any> | undefined = undefined,
> {
  handler(request: IHttpRequest<TBody>): Promise<IHttpResponse>;
}
