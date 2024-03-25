import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cors from 'cors';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.use(cors({
      origin: 'http://localhost:5173',
   }))
   app.useGlobalPipes(new ValidationPipe());
   useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
   });
   await app.listen(3000);
}
bootstrap();
