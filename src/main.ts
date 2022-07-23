import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as morgan from 'morgan';

const logStreamAPI = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(morgan('combined', { stream: logStreamAPI }));

  await app.listen(5000);
}


bootstrap();
