import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ChatService } from './chat.service';
import { socketIds } from './socketIds';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @Inject()
  chatService: ChatService;

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket): Promise<string> {
    // const userRoom = client.handshake.query.userId;
    // // 连接默认加入"阿童木聊天室"房间
    // client.join(this.defaultGroup);
    // // 进来统计一下在线人数
    // this.getActiveGroupUser();
    // // 用户独有消息房间 根据userId
    // if(userRoom) {
    //   client.join(userRoom);
    // }
    console.log('有人链接了' + client.id);
    return '连接成功';
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
    return '断开连接';
  }

  // 加入房间
  @SubscribeMessage('join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomId') roomId: string,
    @MessageBody('userId') userId: string
  ): string {
    socketIds.set(userId, client.id);
    console.log('SocketIds: ' + socketIds, socketIds.size);
    console.log('socketId: ' + client.id);
    client.join(roomId);
    console.log(userId, roomId);
    console.log('socketRooms: ' + client.rooms);
    this.server.to(roomId).emit('join', userId);
    return 'Message received';
  }

  // 加入房间
  @SubscribeMessage('leave')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomId') roomId: string,
    @MessageBody('userId') userId: string
  ): string {
    // const room = this.server.sockets.adapter.rooms.get(roomId);
    this.server.to(roomId).emit('leave', userId);
    client.leave(roomId);
    return 'Message received';
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, payload: any): string {
    console.log('Received message:', payload);
    // console.log('Received client:', client);
    return 'Message received222';
  }

  @SubscribeMessage('message2')
  handleMessage2(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ): string {
    console.log('Received message:', data);
    return 'Message received';
  }
}
