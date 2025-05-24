import { Chatbot } from "./Chatbot";

export function Footer() {
  return (
    <footer className="fixed left-0 bottom-0 w-full h-12 flex flex-col items-center justify-center gap-4 p-4 bg-primary text-white shadow-sm z-10">
      <Chatbot />
    </footer>
  );
}
