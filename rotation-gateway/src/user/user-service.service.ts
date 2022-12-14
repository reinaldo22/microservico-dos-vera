import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { relativeTimeThreshold } from 'moment-timezone';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  private logger = new Logger(UsersService.name)

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>) { }

  async findbyEmail(email: string) {
    const us = await this.usersRepository.findOneByOrFail({ email })
    console.log(us)
    return us
  }
}
