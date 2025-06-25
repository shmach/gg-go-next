import type { IController } from "../@types/IController";
import type { IHttpRequest, IHttpResponse } from "../@types/IHttp";
import type { SendChatbotMessageUseCase } from "../useCases/SendChatbotMessageUseCase";

interface ISendChatbotMessageControllerRequest {
  prompt: string;
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

      const { prompt } = request.body;

      const { response } = await this.sendChatbotMessageUseCase.execute({
        prompt,
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
