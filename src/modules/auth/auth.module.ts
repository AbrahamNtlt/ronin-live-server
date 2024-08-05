import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserRepository } from '@/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { jwtConstants } from '../../common/constant/jwt';
// import { JwtStragegy } from './jwt.strategy';
// import * as config from 'config';

// const jwtConfig = config.get('jwt');
@Module({
  imports: [
    UserModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        // expiresIn: jwtConfig.expiresIn,
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  // controllers: [AuthController],
  // // providers: [AuthService, JwtStragegy],
  // providers: [AuthService],
  // exports: [PassportModule, AuthService],
})
export class AuthModule {}
