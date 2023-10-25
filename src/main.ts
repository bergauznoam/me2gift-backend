import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@root/app.module';
import { CustomExceptionFilter } from '@root/exception.filter';
import { appConfiguration } from '@config/app.conf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3001"
      ],
      exposedHeaders: [
        appConfiguration.jwtAccessTokenHeaderName
      ],
      credentials: true,
      optionsSuccessStatus: 200
    }
  });
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
  await app.listen(process.env.PORT);
}
bootstrap();
