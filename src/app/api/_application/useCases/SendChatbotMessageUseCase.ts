import { GoogleGenAI } from "@google/genai";
import type { IUseCase } from "../@types/IUseCase";

interface ISendChatbotMessageUseCaseParams {
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
    if (!params || !params.prompt) {
      throw new Error(
        "Invalid parameters provided to SendChatbotMessageUseCase",
      );
    }

    const { prompt } = params;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const chatbotResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        systemInstruction:
          "You are a bot that recommends games based on what the user says in the chat. When the user asks for a game recommendation, you should provide a game a list of 5 games that are similar to what they mentioned. If they ask for a specific genre, recommend a game from that genre.",
      },
    });

    return {
      response: chatbotResponse.text || "No response from chatbot.",
    };
  }
}
