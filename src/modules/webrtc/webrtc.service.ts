import { Inject, Injectable } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class WebrtcService {
  @Inject(ChatService) private readonly chatService: ChatService;
}
