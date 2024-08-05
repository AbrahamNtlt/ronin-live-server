import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { getUserDto } from './dto/user-dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  findAll(query: getUserDto) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  // findOne(id: number) {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  find(username: string) {
    return this.userRepository.find({ where: { username } });
  }

  async create(user: User) {
    const userTemp = await this.userRepository.create(user);
    return this.userRepository.save(userTemp);
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
