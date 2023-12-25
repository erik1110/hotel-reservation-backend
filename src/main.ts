import { AppModule } from './app.module';
import { ErrorHandlerFilter } from './utils/errorHandler';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorHandlerFilter());
  const config = new DocumentBuilder()
    .setTitle('Hotel Reservation Backend')
    .setDescription('This is my swagger document.')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'HTTP') // HTTP scheme
    .addServer('https://localhost', 'HTTPS') // HTTPS scheme
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();