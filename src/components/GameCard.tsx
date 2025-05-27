"use client";

import type { IGame } from "@/@types/IGame";
import { cn } from "@/lib/utils";
import { getFullCover } from "@/utils/getFullCover";
import { ImageOffIcon } from "lucide-react";
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

export function GameCard({ game }: { game: IGame }) {
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
            "w-[130px] h-fit cursor-pointer relative z-10 transition-all",
            gameHovered !== game.id && "grayscale-100",
          )}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onHoverStart={() => setGameHovered(game.id)}
          onHoverEnd={() => setGameHovered(undefined)}
        >
          {game.cover ? (
            <Image
              alt={game.name}
              src={getGameCover(game.cover.url)}
              width={130}
              height={180}
              className="h-[180px] hover:border hover:border-primary hover:shadow-sm transition-all duration-200 ease-in-out"
            />
          ) : (
            <div className="w-[130px] h-[174px] bg-gray-200 flex items-center justify-center">
              <ImageOffIcon />
            </div>
          )}
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
