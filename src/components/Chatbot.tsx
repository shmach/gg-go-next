"use client";

import { cn } from "@/lib/utils";
import { ChatbotServices } from "@/services/chatbotServices";
import { useControlAnimationStore } from "@/store/useControlAnimationStore";
import { Bot, CircleX, Loader2, SendHorizonal, User2Icon } from "lucide-react";
import { AnimatePresence, type Transition, motion } from "motion/react";
import { useOptimistic, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Input } from "./Input";
import { MarkdownText } from "./MarkdownText";

export function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { pauseAnimation, setPauseAnimation } = useControlAnimationStore();

  const transition: Transition = {
    duration: 0.35,
    ease: [0.59, 0, 0.35, 1],
    y: { type: "spring", visualDuration: 0.7, bounce: 0.2 },
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
    transition: transition,
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
                zIndex: 3,
              }}
              className="fixed top-0 left-0 bg-secondary/90 flex items-center justify-center"
            >
              <section className="w-full lg:w-[50%] min-h-[90%] px-5 py-6 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4">
                  <h2>(Conversation Title)</h2>
                  <Button
                    variant="default"
                    className="text-primary p-0 has-[>svg]:px-0 gap-0 cursor-pointer bg-transparent hover:text-white transition-all"
                    type="button"
                    size="icon"
                    onClick={() => {
                      setIsChatOpen(false);
                      setPauseAnimation(false);
                    }}
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
        className="hover:cursor-pointer rounded-full place-items-center p-1"
        type="button"
        style={{ zIndex: 4 }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: isChatOpen ? "var(--primary)" : "var(--secondary)",
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          bounce: 0.2,
          backgroundColor: { visualDuration: 0.3 },
        }}
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          setPauseAnimation(!pauseAnimation);
        }}
      >
        <Bot className="text-white" style={{ zIndex: 5 }} size={35} />
      </motion.button>
    </>
  );
}

type IChatMessage = {
  owner: string;
  text: string;
  isPending?: boolean;
  triggerAnimation?: boolean;
};

function ChatbotConversation() {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  // const [userPrompt, setUserPrompt] = useState("");

  const [optimisticChat, addOptimisticChat] = useOptimistic(
    chatMessages,
    (prevMessages, newMessage: IChatMessage) => {
      return prevMessages.concat(newMessage);
    },
  );

  const [isPending, startTransition] = useTransition();

  const submitAction = async (formData: FormData) => {
    try {
      startTransition(async () => {
        const userMessage: IChatMessage = {
          owner: "user",
          text: formData.get("userPrompt") as string,
          isPending: false,
          triggerAnimation: true,
        };

        let botMessage: IChatMessage = {
          owner: "bot",
          text: "Thinking...",
          isPending: true,
          triggerAnimation: true,
        };

        addOptimisticChat(userMessage);
        addOptimisticChat(botMessage);

        const response = await ChatbotServices.sendChatbotMessage(
          formData.get("userPrompt") as string,
        );

        botMessage = {
          owner: "bot",
          text: response.result.response,
          isPending: false,
        };

        setChatMessages((prev) => [
          ...prev,
          { ...userMessage, triggerAnimation: false },
          { ...botMessage, triggerAnimation: false },
        ]);
        formData.set("userPrompt", "");
      });
    } catch (error) {
      alert("An error occurred while sending the message.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <form
        action={submitAction}
        className="w-full flex flex-col justify-between items-center"
      >
        <div className="w-full flex flex-col rounded-lg h-[500px] md:h-[420px] lg:h-[470px] xl:min-h-[600px] xl:max-h-[700px] overflow-y-auto mt-8">
          <ul className="w-full pr-3 text-base flex flex-col gap-4">
            {optimisticChat.length > 0 &&
              optimisticChat.map((chatMessage, _index) => (
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
            name="userPrompt"
            className="flex-1 h-full border-none bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            type="text"
            placeholder="Type your message here..."
            required
          />
          <div className="flex gap-2 justify-center items-center">
            <Button
              type="submit"
              size="icon"
              className="cursor-pointer"
              disabled={isPending}
            >
              <SendHorizonal />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

function ChatbotMessage({ message }: { message: IChatMessage }) {
  return (
    <motion.div
      initial={message.triggerAnimation && { opacity: 0, y: 20 }}
      animate={message.triggerAnimation && { opacity: 1, y: 0 }}
      className={cn(
        message.owner === "user" ? "flex flex-row-reverse" : "flex",
        "w-full gap-2",
      )}
    >
      <span>
        <ChatbotMessageAvatar owner={message.owner} />
      </span>
      <span
        className={cn(
          message.owner === "user"
            ? "rounded-ss-lg bg-background/70"
            : "rounded-se-lg bg-slate-900 text-primary",
          "mt-[13px] py-2 px-3 rounded-b-lg",
        )}
      >
        {!message.isPending ? (
          <MarkdownText markdown={message.text} />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </span>
    </motion.div>
  );
}

function ChatbotMessageAvatar({ owner, src }: { owner: string; src?: string }) {
  return owner === "user" ? (
    <Avatar>
      <AvatarImage src={src} alt="Your profile picture" />
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
