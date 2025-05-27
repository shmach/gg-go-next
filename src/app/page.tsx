"use server";

import type { IGame } from "@/@types/IGame";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { getActualEpochTime } from "@/utils/getActualEpochTime";
import axios from "axios";
import { Suspense } from "react";

export default async function Home() {
  const [releasedGames, upcomingGames] = await Promise.all([
    await axios
      .post<{ games: IGame[] }>("http://localhost:3000/api/games/games-list", {
        apiQuery: `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date <= ${getActualEpochTime()}; sort first_release_date desc; limit 8;`,
      })
      .then((res) => res.data.games),
    await axios
      .post<{ games: IGame[] }>("http://localhost:3000/api/games/games-list", {
        apiQuery: `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date >= ${getActualEpochTime()}; sort first_release_date desc; limit 8;`,
      })
      .then((res) => res.data.games),
  ]);

  return (
    <div className="min-w-full min-h-full flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] px-5 py-6 gap-4 relative">
      <h1 className="text-primary text-2xl font-bold">GG, GO NEXT!</h1>
      <div className="w-full h-fit flex flex-col items-center justify-start gap-4">
        <h2 className="text-primary text-xl font-medium">Latest Games</h2>
        <Suspense fallback={"Loading..."}>
          <ul className="w-full h-fit flex justify-center items-start gap-8 py-3">
            {releasedGames.map((game) => (
              <li
                key={game.name}
                className="w-fit h-fit hover:border hover:border-primary"
              >
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
      <div className="w-full h-fit flex flex-col items-center justify-start gap-4 mt-6">
        <h2 className="text-primary text-xl font-medium">Releasing soon!</h2>
        <Suspense fallback={"Loading..."}>
          <ul className="w-full h-fit flex justify-center items-start gap-8 py-3">
            {upcomingGames.map((game) => (
              <li
                key={game.name}
                className="w-fit h-fit hover:border hover:border-primary"
              >
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
