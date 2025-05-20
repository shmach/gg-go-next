"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

type IGame = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  releaseDate: string;
  genre: string;
  platform: string;
  developer: string;
  publisher: string;
};

const mock: IGame[] = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    description: "Description of Game 1",
    imageUrl: "/game_cover_mock.jpg",
    imageAlt: "Image of Game 1",
    rating: 90,
    releaseDate: "2023-01-01",
    genre: "Action",
    platform: "PC",
    developer: "Developer 1",
    publisher: "Publisher 1",
  },
  {
    id: 2,
    name: "Game 2",
    description: "Description of Game 2",
    imageUrl: "/game_cover_mock.jpg",
    imageAlt: "Image of Game 2",
    rating: 85,
    releaseDate: "2023-02-01",
    genre: "Adventure",
    platform: "PC",
    developer: "Developer 2",
    publisher: "Publisher 2",
  },
  {
    id: 3,
    name: "Game 3",
    description: "Description of Game 3",
    imageUrl: "/game_cover_mock.jpg",
    imageAlt: "Image of Game 3",
    rating: 80,
    releaseDate: "2023-03-01",
    genre: "RPG",
    platform: "PC",
    developer: "Developer 3",
    publisher: "Publisher 3",
  },
  {
    id: 4,
    name: "Game 4",
    description: "Description of Game 4",
    imageUrl: "/game_cover_mock.jpg",
    imageAlt: "Image of Game 4",
    rating: 75,
    releaseDate: "2023-04-01",
    genre: "Strategy",
    platform: "PC",
    developer: "Developer 4",
    publisher: "Publisher 4",
  },
  {
    id: 5,
    name: "Game 5",
    description: "Description of Game 5",
    imageUrl: "/game_cover_mock.jpg",
    imageAlt: "Image of Game 5",
    rating: 70,
    releaseDate: "2023-05-01",
    genre: "Simulation",
    platform: "PC",
    developer: "Developer 5",
    publisher: "Publisher 5",
  },
];

export function GamesList() {
  return (
    <ul className="w-full h-fit flex justify-center items-start gap-8 py-3">
      {mock.map((game) => (
        <li
          key={game.id}
          className="w-fit h-fit hover:border hover:border-primary"
        >
          <GameCard game={game} />
        </li>
      ))}
    </ul>
  );
}

function GameCard({ game }: { game: IGame }) {
  const [gameHovered, setGameHovered] = useState<number | undefined>(undefined);

  return (
    <Dialog key={`game-${game.id}`}>
      <DialogTrigger asChild>
        <motion.div
          className={cn(
            "w-[130px] h-fit cursor-pointer relative z-10 transition-all",
            gameHovered !== game.id && "grayscale-100",
          )}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onHoverStart={() => setGameHovered(game.id)}
          onHoverEnd={() => setGameHovered(undefined)}
        >
          <Image
            alt={game.imageAlt}
            src={game.imageUrl}
            width={130}
            height={320}
            className="hover:border hover:border-primary hover:shadow-sm transition-all duration-200 ease-in-out"
          />
          <AnimatePresence>
            {gameHovered === game.id && (
              <motion.span
                className="absolute bottom-0 w-full h-fit bg-primary text-white text-xs font-medium py-1 px-1 rounded-b-md text-center -z-10 border border-primary"
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
