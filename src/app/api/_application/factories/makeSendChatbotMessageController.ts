import { SendChatbotMessageController } from "../controllers/SendChatbotMessageController";
import { SendChatbotMessageUseCase } from "../useCases/SendChatbotMessageUseCase";

export function makeSendChatbotMessageController() {
  const sendChatbotMessageUseCase = new SendChatbotMessageUseCase();
  const sendChatbotMessageController = new SendChatbotMessageController(
    sendChatbotMessageUseCase,
  );

  return sendChatbotMessageController;
}
