import { resolve } from 'path';
import * as dotenv from "dotenv";
console.log(resolve(__dirname, `./env/${process.env.NODE_ENV || 'development'}.env`))
dotenv.config({
  path: resolve(__dirname, `./env/${process.env.NODE_ENV || 'development'}.env`),
  processEnv: process.env,
  override: false
});

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@root/app.module';
import { CustomExceptionFilter } from '@root/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['docs'] });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Me2Gift')
    .setDescription('Me2Gift API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
