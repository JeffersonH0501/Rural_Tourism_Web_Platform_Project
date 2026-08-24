import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { env } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({ origin: env.webOrigin, credentials: true });
  app.enableShutdownHooks();
  const swagger = new DocumentBuilder()
    .setTitle('Rural Tourism API')
    .setDescription(
      'API for rural products, crafts, farms, tours, and promotions',
    )
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, swagger),
  );
  await app.listen(env.port, '0.0.0.0');
}
bootstrap();
