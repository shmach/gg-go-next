import { AxiosError } from "axios";
import type { IController } from "../@types/IController";
import type { IHttpRequest, IHttpResponse } from "../@types/IHttp";
import type { GetGamesListUseCase } from "../useCases/GetGamesListUseCase";

interface IGetGamesListControllerRequest {
  apiQuery: string;
  url: string;
}

export class GetGamesListController
  implements IController<IGetGamesListControllerRequest>
{
  constructor(private readonly getGamesListUseCase: GetGamesListUseCase) {}

  async handler(
    request: IHttpRequest<IGetGamesListControllerRequest>,
  ): Promise<IHttpResponse> {
    try {
      const { body } = request;

      if (!body) {
        return {
          statusCode: 400,
          body: { error: "Invalid request body" },
        };
      }

      const { apiQuery, url } = body;

      const response = await this.getGamesListUseCase.execute({
        apiQuery,
        url,
      });

      return {
        statusCode: 200,
        body: response.games,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          statusCode: error.response?.status || 500,
          body: { error: error.message },
        };
      }

      return {
        statusCode: 500,
        body: { error: "Internal server error" },
      };
    }
  }
}
