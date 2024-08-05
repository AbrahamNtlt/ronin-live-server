import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebrtcService } from './webrtc.service';
import { Server, Socket } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import { socketIds } from '../chat/socketIds';

@WebSocketGateway()
export class WebrtcGateway {
  // @Inject(ChatService) private readonly chatService: ChatService;

  @WebSocketServer()
  server: Server;

  @Inject(Logger)
  logger: Logger;

  constructor(private readonly webrtcService: WebrtcService) {}

  @SubscribeMessage('offer')
  handleSendOffer(
    @ConnectedSocket() client: Socket,
    @MessageBody('callerId') callerId: string,
    @MessageBody('calleeId') calleeId: string,
    @MessageBody('offerSDP') offerSDP: string
  ): string {
    const socketId = socketIds.get(calleeId);
    if (socketId) {
      this.logger.log(
        '[offer]' + 'socketId: ' + socketId + ' , callerId: ' + callerId
      );
      this.server.to(socketId).emit('offer', {
        callerId,
        calleeId,
        offerSDP,
      });
    } else {
      console.log(socketIds);
    }
    return 'Message received';
  }

  @SubscribeMessage('answer')
  handleSendAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody('callerId') callerId: string,
    // @MessageBody('calleeId') calleeId: string,
    @MessageBody('answerSDP') answerSDP: string
  ): string {
    const socketId = socketIds.get(callerId);
    this.logger.log(
      '[answer]' + 'socketId: ' + socketId + ' , callerId: ' + callerId
    );
    if (socketId) {
      this.server.to(socketId).emit('answer', {
        // callerId,
        // calleeId,
        answerSDP,
      });
    } else {
      console.log(socketIds);
    }
    return 'Message received';
  }
  @SubscribeMessage('candidate')
  handleCandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody('targetId') targetId: string,
    @MessageBody('candidate') candidate: string
  ): string {
    const socketId = socketIds.get(targetId);

    if (socketId) {
      this.server.to(socketId).emit('candidate', {
        // callerId,
        // calleeId,
        candidate,
      });
    } else {
      console.log(socketIds);
    }
    return 'Message received';
  }
}
