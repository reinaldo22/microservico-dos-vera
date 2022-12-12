import { Module } from '@nestjs/common';
import { ProxyrmqpModule } from 'src/proxyrmqp/proxyrmqp.module';
import { UserController } from './user.controller';

@Module({
  imports: [ProxyrmqpModule],
  controllers: [UserController],
  providers: []
})
export class UserModule { }
