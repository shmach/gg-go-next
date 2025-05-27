import { makeGetGamesListController } from "@/app/api/_application/factories/makeGetGamesListController";
import { type NextRequest, NextResponse } from "next/server";

interface IGamesListDTO {
  apiQuery: string;
  url: string;
  released?: boolean;
}

export async function POST(request: NextRequest) {
  const body = request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 },
    );
  }

  const { apiQuery } = (await body) as IGamesListDTO;

  const response = await makeGetGamesListController().handler({
    body: { apiQuery },
  });

  return NextResponse.json(
    { games: response.body },
    { status: response.statusCode },
  );
}
