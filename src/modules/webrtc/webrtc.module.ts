import { Module } from '@nestjs/common';
import { WebrtcService } from './webrtc.service';
import { WebrtcGateway } from './webrtc.gateway';
import { ChatService } from '../chat/chat.service';

@Module({
  providers: [WebrtcGateway, WebrtcService,ChatService],
})
export class WebrtcModule {
}
