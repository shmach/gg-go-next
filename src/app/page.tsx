"use server";

import type { IGame } from "@/@types/IGame";
import { Footer } from "@/components/Footer";
import { GamesListScrollAnimation } from "@/components/GamesList";
import { getActualEpochTime } from "@/utils/getActualEpochTime";
import axios from "axios";
import { Suspense } from "react";

export default async function Home() {
  const [releasedGames, upcomingGames] = await Promise.all([
    await axios
      .post<{ games: IGame[] }>("http://localhost:3000/api/games/games-list", {
        apiQuery: `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date <= ${getActualEpochTime()}; sort first_release_date desc; limit 15;`,
      })
      .then((res) => res.data.games),
    await axios
      .post<{ games: IGame[] }>("http://localhost:3000/api/games/games-list", {
        apiQuery: `fields name, cover.url, first_release_date, release_dates.human; where category = 0 & first_release_date >= ${getActualEpochTime()}; sort first_release_date asc; limit 15;`,
      })
      .then((res) => res.data.games),
  ]);

  return (
    <div className="min-w-full min-h-full flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] px-5 py-6 gap-4 relative">
      <h1 className="text-primary text-2xl font-bold">GG, GO NEXT!</h1>
      <section className="w-full lg:w-[70%] h-fit flex flex-col items-center justify-start gap-2">
        <div className="w-full h-fit flex flex-col items-center justify-start gap-4">
          <h2 className="text-primary text-xl font-medium">Latest Games</h2>
          <Suspense fallback={"Loading..."}>
            <GamesListScrollAnimation games={releasedGames} />
          </Suspense>
        </div>
        <div className="w-full h-fit flex flex-col items-center justify-start gap-4 mt-6">
          <h2 className="text-primary text-xl font-medium">Releasing soon!</h2>
          <Suspense fallback={"Loading..."}>
            <GamesListScrollAnimation games={upcomingGames} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </div>
  );
}
