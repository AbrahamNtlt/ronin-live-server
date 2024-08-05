import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
// import { UserModule } from './modules/user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import mysqlConfig from '../config/mysql';
// import { User } from './modules/user/entity/user.entity';
// import { AuthModule } from './modules/auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './common/guards/auth.guard';
import { ChatModule } from './modules/chat/chat.module';
import { WebrtcModule } from './modules/webrtc/webrtc.module';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: mysqlConfig.host,
    //   port: mysqlConfig.port,
    //   username: mysqlConfig.username,
    //   password: mysqlConfig.password,
    //   database: mysqlConfig.database,
    //   entities: [User],
    //   synchronize: true,
    //   logging: true,
    // }),
    // UserModule,
    // AuthModule,
    ChatModule,
    WebrtcModule,
  ],
  providers: [
    Logger,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [Logger],
})
export class AppModule {}
