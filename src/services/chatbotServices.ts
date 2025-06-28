import type { Content } from "@google/genai";
import { httpClient } from "./httpClient";

type SendChatbotMessageDTO = {
  prompt: string;
  chatHistory: Content[];
};

// biome-ignore lint/complexity/noStaticOnlyClass: I want to keep this as a static class for now
export class ChatbotServices {
  static async sendChatbotMessage({
    prompt,
    chatHistory,
  }: SendChatbotMessageDTO) {
    const response = await httpClient.post("/chatbot/send-message", {
      prompt,
      chatHistory,
    });
    return response.data;
  }
}
