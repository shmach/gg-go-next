import { GetGamesListController } from "../controllers/GetGamesListController";
import { GetGamesListUseCase } from "../useCases/GetGamesListUseCase";

export function makeGetGamesListController() {
  const getGamesListUseCase = new GetGamesListUseCase();
  const getGamesListController = new GetGamesListController(
    getGamesListUseCase,
  );

  return getGamesListController;
}
