"use client";

import type { IGame } from "@/@types/IGame";
import { cn } from "@/lib/utils";
import { useControlAnimationStore } from "@/store/useControlAnimationStore";
import { getFullCover } from "@/utils/getFullCover";
import { ImageOffIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

export function GamesListScrollAnimation({ games }: { games: IGame[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const { pauseAnimation } = useControlAnimationStore();

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      for (const item of scrollerContent) {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      }

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      "forwards",
    );
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "60s");
    }
  };

  return (
    <div
      ref={containerRef}
      className="scroller relative max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full h-fit shrink-0 flex-nowrap gap-4 py-4 hover:[animation-play-state:paused]",
          start && "animate-scroll",
          pauseAnimation && "[animation-play-state:paused]",
        )}
      >
        {games.map((game) => (
          <li key={game.name} className="w-fit px-4 py-6">
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function GameCard({ game }: { game: IGame }) {
  const [gameHovered, setGameHovered] = useState<number | undefined>(undefined);

  const getGameCover = (coverUrl: string) => {
    const fullCover = getFullCover(`https:${coverUrl}`);
    if (!fullCover) {
      return coverUrl;
    }
    return fullCover;
  };

  return (
    <Dialog key={`game-${game.id}`}>
      <DialogTrigger asChild>
        <motion.div
          className={cn(
            "w-full h-fit cursor-pointer relative transition-all",
            gameHovered !== game.id && "grayscale-100",
          )}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onHoverStart={() => setGameHovered(game.id)}
          onHoverEnd={() => setGameHovered(undefined)}
        >
          <AnimatePresence>
            {gameHovered === game.id && (
              <motion.span
                className="absolute left-1/2 -top-10 transform -translate-x-1/2 w-fit h-fit bg-primary text-white text-xs font-medium py-1 px-1 rounded-md text-center text-nowrap border border-primary"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: "100%" }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {game.first_release_date === 0
                  ? "TBA"
                  : new Date(game.first_release_date * 1000).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    ) || game.first_release_date}
              </motion.span>
            )}
          </AnimatePresence>
          {game.cover ? (
            <Image
              alt={game.name}
              src={getGameCover(game.cover.url)}
              width={130}
              height={180}
              className="h-[180px] hover:border hover:border-primary hover:shadow-sm transition-all duration-200 ease-in-out"
            />
          ) : (
            <div className="h-[180px] w-[130px] hover:border hover:border-primary hover:shadow-sm transition-all duration-200 ease-in-out bg-gray-700 flex items-center justify-center">
              <ImageOffIcon />
            </div>
          )}
          <AnimatePresence>
            {gameHovered === game.id && (
              <motion.span
                className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-fit h-fit bg-primary text-white text-xs font-medium py-1 px-1 rounded-md text-center text-nowrap border border-primary"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: "100%" }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {game.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Game Details</DialogTitle>
          <div className="flex">
            <div className="w-2/4 h-full flex justify-center items-center">
              <Image
                alt={game.name}
                src={getGameCover(game.cover?.url || "")}
                width={160}
                height={200}
                className="h-[200px] w-[160px] object-cover"
              />
            </div>
            <div className="w-2/4 h-fit flex flex-col">
              <h3 className="text-lg font-medium">{game.name}</h3>
              <span className="text-sm text-muted-foreground">
                {game.first_release_date === 0
                  ? "TBA"
                  : new Date(game.first_release_date * 1000).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    ) || game.first_release_date}
              </span>
              {game.platforms && game.platforms.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {game.platforms
                    .map(
                      (platform: Record<string, string>) =>
                        platform.abbreviation,
                    )
                    .join(", ")}
                </span>
              )}
              {game.summary && (
                <p className="text-sm mt-2">
                  {/* {game.summary.length > 200
                      ? `${game.summary.slice(0, 200)}...`
                      : game.summary} */}
                  {game.summary}
                </p>
              )}
              {game.url && (
                <Button variant="link" className="mt-2">
                  <Link
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View on IGDB
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
