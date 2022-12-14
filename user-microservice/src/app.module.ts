import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModuleMicro } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './entity/User';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User],
      synchronize: true
    } as TypeOrmModuleOptions) , UserModuleMicro],
  controllers: [],
  providers: [],
 
})
export class AppModuleMicro { }
