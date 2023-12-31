import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorHandlerFilter } from './utils/errorHandler';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ErrorHandlerFilter());
  const config = new DocumentBuilder()
    .setTitle('Hotel Reservation Backend')
    .setDescription('This is my swagger document.')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT}`, 'Local Environment')
    .addServer(process.env.PRODUCTION_URL, 'Production') // HTTPS scheme
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
