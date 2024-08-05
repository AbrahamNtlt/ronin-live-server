import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../user/entity/user.entity';
// // import { nameVerify, passwordVerify } from 'src/common/tool/utils';
// import { RCode } from 'src/common/constant/rcode';
import { UserService } from '../user/user.service';
import { CustomException } from '../../common/constant/custom-exception';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private userService: UserService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // TODO: 生成一个 JWT，并在这里返回
    // 而不是返回一个用户对象

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<any> {
    const users = await this.userService.find(username);
    if (users.length) {
      throw new CustomException('该用户名已存在');
    }
    return this.userService.create({
      username,
      password,
    } as User);
  }

  // async login(data: User): Promise<any> {
  //   const user = await this.userRepository.findOne({
  //     where: {
  //       username: data.username,
  //       password: data.password,
  //     },
  //   });
  //   if (!user) {
  //     return { code: 1, msg: '密码错误', data: '' };
  //   }
  //   // if (!passwordVerify(data.password) || !nameVerify(data.username)) {
  //   //   return { code: RCode.FAIL, msg: '注册校验不通过！', data: '' };
  //   // }
  //   user.password = data.password;
  //   const payload = { userId: user.id, password: data.password };
  //   return {
  //     msg: '登录成功',
  //     data: {
  //       user: user,
  //       token: this.jwtService.sign(payload),
  //     },
  //   };
  // }
  //
  // async register(user: User): Promise<any> {
  //   const isHave = await this.userRepository.find({
  //     where: { username: user.username },
  //   });
  //   if (isHave.length) {
  //     return { code: RCode.FAIL, msg: '用户名重复', data: '' };
  //   }
  //   // if (!passwordVerify(user.password) || !nameVerify(user.username)) {
  //   //   return { code: RCode.FAIL, msg: '注册校验不通过！', data: '' };
  //   // }
  //   user.avatar = `api/avatar/avatar(${Math.round(
  //     Math.random() * 19 + 1
  //   )}).png`;
  //   // user.role = 'user';
  //   const newUser = await this.userRepository.save(user);
  //   const payload = { userId: newUser.id, password: newUser.password };
  //   // await this.groupUserRepository.save({
  //   //   userId: newUser.userId,
  //   //   groupId: '阿童木聊天室',
  //   // });
  //   return {
  //     msg: '注册成功',
  //     data: {
  //       user: newUser,
  //       token: this.jwtService.sign(payload),
  //     },
  //   };
  // }
}
