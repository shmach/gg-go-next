import { makeSendChatbotMessageController } from "@/app/api/_application/factories/makeSendChatbotMessageController";
import type { Content } from "@google/genai";
import { type NextRequest, NextResponse } from "next/server";

interface ISendChatbotMessageDTO {
  prompt: string;
  chatHistory: Content[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 },
    );
  }

  const { prompt, chatHistory } = body as ISendChatbotMessageDTO;

  const response = await makeSendChatbotMessageController().handler({
    body: { prompt, chatHistory },
  });

  return NextResponse.json(
    { result: response.body },
    { status: response.statusCode },
  );
}
