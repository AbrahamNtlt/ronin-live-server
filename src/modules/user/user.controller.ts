import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Query, Res
} from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { getUserDto } from './dto/user-dto';
import * as path from "path";

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private userService: UserService) {
    this.logger.log('UserController init');
  }

  // @UseGuards(AuthGuard)
  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query);
  }

  @Get('add')
  // addUser(user: User) {
  addUser(@Body() user: User) {
    // const user = {
    //   username: 'tommy',
    //   password: '123456',
    // } as User;
    return this.userService.create(user);
  }
}
