import axios from "axios";
import type { IUseCase } from "../@types/IUseCase";

interface IGetGamesListUseCaseParams {
  apiQuery: string;
  url: string;
}

interface IGetGamesListUseCaseResponse {
  // biome-ignore lint/suspicious/noExplicitAny: Because the structure of the response is not defined
  games: Record<string, any>[];
}

export class GetGamesListUseCase
  implements IUseCase<IGetGamesListUseCaseParams, IGetGamesListUseCaseResponse>
{
  async execute(
    params: IGetGamesListUseCaseParams | undefined,
  ): Promise<IGetGamesListUseCaseResponse> {
    if (!params || !params.apiQuery || !params.url) {
      throw new Error("Invalid parameters provided to GetGamesListUseCase");
    }

    const { apiQuery, url } = params;

    const response = await axios.post(url, apiQuery, {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
      },
    });

    return { games: response.data };
  }
}
