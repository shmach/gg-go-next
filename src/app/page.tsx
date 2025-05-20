import { GamesList } from "@/components/GamesList";

export default function Home() {
  return (
    <div className="min-w-full min-h-full flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] px-5 py-6 gap-4">
      <h1 className="text-primary text-xl">GG, GO NEXT!</h1>
      <GamesList />
    </div>
  );
}
