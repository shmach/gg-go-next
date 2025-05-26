export interface IUseCase<TParams, TResponse> {
  execute(params: TParams | undefined): Promise<TResponse | undefined>;
}
