import { makeSendChatbotMessageController } from "@/app/api/_application/factories/makeSendChatbotMessageController";
import { type NextRequest, NextResponse } from "next/server";

interface ISendChatbotMessageDTO {
  prompt: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 },
    );
  }

  const { prompt } = body as ISendChatbotMessageDTO;

  const response = await makeSendChatbotMessageController().handler({
    body: { prompt },
  });

  return NextResponse.json(
    { result: response.body },
    { status: response.statusCode },
  );
}
