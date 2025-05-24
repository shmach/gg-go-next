import { Footer } from "@/components/Footer";
import { GamesList } from "@/components/GamesList";

export default function Home() {
  return (
    <div className="min-w-full min-h-full flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] px-5 py-6 gap-4 relative">
      <h1 className="text-primary text-2xl font-bold">GG, GO NEXT!</h1>
      <div className="w-full h-fit flex flex-col items-center justify-start gap-4">
        <h2 className="text-primary text-xl font-medium">Latest Games</h2>
        <GamesList />
      </div>
      <div className="w-full h-fit flex flex-col items-center justify-start gap-4 mt-6">
        <h2 className="text-primary text-xl font-medium">Releasing soon!</h2>
        <GamesList />
      </div>
      <Footer />
    </div>
  );
}
