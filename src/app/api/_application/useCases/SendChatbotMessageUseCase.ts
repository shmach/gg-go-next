import { type Content, GoogleGenAI } from "@google/genai";
import type { IUseCase } from "../@types/IUseCase";

interface ISendChatbotMessageUseCaseParams {
  chatHistory: Content[];
  prompt: string;
}

interface ISendChatbotMessageUseCaseResponse {
  response: string;
}

export class SendChatbotMessageUseCase
  implements
    IUseCase<
      ISendChatbotMessageUseCaseParams,
      ISendChatbotMessageUseCaseResponse
    >
{
  async execute(
    params: ISendChatbotMessageUseCaseParams,
  ): Promise<ISendChatbotMessageUseCaseResponse> {
    if (!params) {
      throw new Error(
        "Invalid parameters provided to SendChatbotMessageUseCase",
      );
    }

    const { prompt, chatHistory } = params;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction:
          "You are a bot that recommends games based on what the user says in the chat. When the user asks for a game recommendation, you should provide a game a list of 5 games that are similar to what they mentioned. If they ask for a specific genre, recommend a game from that genre.",
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message: prompt });

    return {
      response: response.text || "No response from chatbot.",
    };
  }
}
