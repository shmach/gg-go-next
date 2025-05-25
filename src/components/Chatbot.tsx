"use client";

import { cn } from "@/lib/utils";
import { Bot, CircleX, Loader2, SendHorizonal, User2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOptimistic, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Input } from "./Input";

export function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const transition = {
    duration: 0.35,
    ease: [0.59, 0, 0.35, 1],
  };

  const enteringState = {
    rotateX: 0,
    skewY: 0,
    height: "100vh",
    width: "100vw",
    scaleY: 1,
    scaleX: 1,
    borderRadius: 0,
    y: 0,
    transition: {
      ...transition,
      y: { type: "spring", visualDuration: 0.7, bounce: 0.2 },
    },
  };

  const exitingState = {
    rotateX: 0,
    height: "50vh",
    width: "50vw",
    skewY: 0,
    scaleY: 0,
    scaleX: 0.3,
    borderRadius: "100%",
    y: 100,
  };

  return (
    <>
      {
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={exitingState}
              animate={enteringState}
              exit={exitingState}
              transition={transition}
              style={{
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
                originX: 1,
                originY: 2,
                height: "100vh",
                width: "100vw",
              }}
              className="fixed top-0 left-0 bg-secondary opacity-90 flex items-center justify-center z-10"
            >
              <section className="min-w-full lg:min-w-[50%] min-h-[90%] px-5 py-6 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4">
                  <h2>(Conversation Title)</h2>
                  <Button
                    variant="default"
                    className="text-primary p-0 has-[>svg]:px-0 gap-0 cursor-pointer bg-transparent hover:text-white transition-all"
                    type="button"
                    size="icon"
                    onClick={() => setIsChatOpen(false)}
                  >
                    <CircleX style={{ scale: 1.5 }} />
                  </Button>
                </div>

                <ChatbotConversation />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      }
      <motion.button
        className="z-20 hover:cursor-pointer rounded-full place-items-center p-1"
        type="button"
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: isChatOpen ? "var(--primary)" : "var(--secondary)",
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          bounce: 0.2,
          backgroundColor: { visualDuration: 0.3, y: 0 },
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <Bot className="text-white z-30" size={35} />
      </motion.button>
    </>
  );
}

type IChatMessage = {
  message: {
    owner: string;
    text: string;
    isPending?: boolean;
  };
};

function ChatbotConversation() {
  const mockConversation = [
    {
      message: {
        owner: "bot",
        text: "Looking for a new game to play? I can help you with that!",
        isPending: false,
      },
    },
    {
      message: {
        owner: "user",
        text: "I want to play a new game, but I don't know which one to choose. I like action and adventure games.",
        isPending: false,
      },
    },
    {
      message: {
        owner: "bot",
        text: "Sure! I can help you find a game that fits your preferences. Do you have any specific platforms in mind, like PC, console, or mobile?",
        isPending: false,
      },
    },
  ];

  const [chatMessages, setChatMessages] =
    useState<IChatMessage[]>(mockConversation);
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");

  const [optimisticChat, addOptimisticChat] = useOptimistic(
    chatMessages,
    (prevMessages, newMessage: IChatMessage) => {
      return prevMessages.concat(newMessage);
    },
  );

  const [isPending, startTransition] = useTransition();

  const handleOptimisticChat = (newMessage: IChatMessage) => {
    startTransition(() => {
      addOptimisticChat(newMessage);
      setChatMessages((prev) => [...prev, newMessage]);
      setUserPrompt("");
    });
  };

  const submitAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting chat message...");
    console.log(userPrompt);
    const newMessage: IChatMessage = {
      message: {
        owner: "user",
        text: userPrompt,
        isPending: false,
      },
    };
    handleOptimisticChat(newMessage);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full min-h-full flex flex-1 justify-center items-center">
          <Loader2 />
        </div>
      ) : (
        <form
          onSubmit={submitAction}
          className="w-full flex flex-col justify-between items-center"
        >
          <div className="w-full flex flex-col rounded-lg h-[500px] md:h-[420px] lg:h-[470px] xl:min-h-[600px] xl:max-h-[700px] overflow-y-auto mt-8">
            <ul className="w-full pr-3 text-base flex flex-col gap-4">
              {optimisticChat.length > 0 &&
                optimisticChat.map((chatMessage, index) => (
                  <li
                    key={Math.random().toString(36).substring(2, 15)}
                    className="w-full flex text-justify justify-start items-start gap-4"
                  >
                    <ChatbotMessage message={chatMessage} />
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-full flex justify-between items-center mt-4 h-16 border border-gray-300 text-base rounded-lg shadow-sm p-3 gap-2">
            <Input
              className="flex-1 h-full border-none bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              type="text"
              placeholder="Type your message here..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              required
            />
            <div className="flex gap-2 justify-center items-center">
              <Button type="submit" size="icon" className="cursor-pointer">
                <SendHorizonal />
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

function ChatbotMessage({ message }: { message: IChatMessage }) {
  return (
    <div
      className={cn(
        message.message.owner === "user" ? "flex flex-row-reverse" : "flex",
        "w-full gap-2",
      )}
    >
      <span>
        <ChatbotMessageAvatar owner={message.message.owner} />
      </span>
      <span
        className={cn(
          message.message.owner === "user"
            ? "rounded-ss-lg bg-background"
            : "rounded-se-lg bg-primary",
          "mt-[13px] w-[50%] p-2 rounded-b-lg",
        )}
      >
        {message.message.text}
      </span>
    </div>
  );
}

function ChatbotMessageAvatar({ owner, src }: { owner: string; src?: string }) {
  return owner === "user" ? (
    <Avatar>
      <AvatarImage src={src} alt="Sua foto de perfil" />
      <AvatarFallback className="bg-primary text-secondary">
        <User2Icon />
      </AvatarFallback>
    </Avatar>
  ) : (
    <Avatar>
      <AvatarFallback className="bg-slate-900 text-primary">
        <Bot />
      </AvatarFallback>
    </Avatar>
  );
}
