import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entity/user.entity';
import { Public } from '../../common/guards/auth.guard';

// @Controller('auth')
@Public()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  // @UseGuards(AuthGuard('local'))
  @Post('/test')
  async test() {
    return {
      code: 1,
      data: 'success',
      msg: 'success',
    };
  }

  @Post('/login')
  async login(@Body() user: User) {
    return this.authService.signIn(user.username, user.password);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/register')
  async register(@Body() user: User) {
    return this.authService.signUp(user.username, user.password);
  }
}
