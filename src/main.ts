import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('밸런스 게임 API')
    .setDescription('밸런스 게임을 제공하는 프로젝트입니다.')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', '로컬 환경')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useStaticAssets(join(__dirname, '..', 'uploadImages'), {
  // prefix: '/uploadImages/',
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
