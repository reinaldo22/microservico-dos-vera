import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ProxyrmqpModule } from './proxyrmqp/proxyrmqp.module';


@Module({
  imports: [UserModule, ProxyrmqpModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule { }
