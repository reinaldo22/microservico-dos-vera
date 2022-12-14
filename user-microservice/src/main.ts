import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModuleMicro } from './app.module';


const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModuleMicro, {

    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/'],
      noAck: false,
      queue: 'admin-backend'
    }
  }
);

  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );
  await app.listen();
}
bootstrap();
