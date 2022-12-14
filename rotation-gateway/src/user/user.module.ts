import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { ProxyrmqpModule } from 'src/proxyrmqp/proxyrmqp.module';
import { UsersService } from './user-service.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),ProxyrmqpModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule { }
