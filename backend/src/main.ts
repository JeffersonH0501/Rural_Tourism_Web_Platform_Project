import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));

  const config = new DocumentBuilder()
  .setTitle('API Doc')
  .setDescription('La descripción de la API')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false, 
    optionsSuccessStatus: 204,
    credentials: true, 
    maxAge: 3600,
  });

  await app.listen(4000);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
