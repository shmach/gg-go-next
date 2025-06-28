import type { Content } from "@google/genai";
import type { IController } from "../@types/IController";
import type { IHttpRequest, IHttpResponse } from "../@types/IHttp";
import type { SendChatbotMessageUseCase } from "../useCases/SendChatbotMessageUseCase";

interface ISendChatbotMessageControllerRequest {
  prompt: string;
  chatHistory: Content[];
}

export class SendChatbotMessageController
  implements IController<ISendChatbotMessageControllerRequest>
{
  constructor(
    private readonly sendChatbotMessageUseCase: SendChatbotMessageUseCase,
  ) {}
  async handler(
    request: IHttpRequest<ISendChatbotMessageControllerRequest>,
  ): Promise<IHttpResponse> {
    try {
      if (!request || !request.body) {
        return {
          statusCode: 400,
          body: { error: "Missing parameters!" },
        };
      }

      const { prompt, chatHistory } = request.body;

      const { response } = await this.sendChatbotMessageUseCase.execute({
        prompt,
        chatHistory,
      });

      return {
        statusCode: 200,
        body: {
          response,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      };
    }
  }
}
