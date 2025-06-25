import { httpClient } from "./httpClient";

// biome-ignore lint/complexity/noStaticOnlyClass: I want to keep this as a static class for now
export class ChatbotServices {
  static async sendChatbotMessage(prompt: string) {
    const response = await httpClient.post("/chatbot/send-message", {
      prompt,
    });

    return response.data;
  }
}
