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
    .setDescription(`Building a Hotel Reservation API on the Backend with TypeScript.\n\nNote: After successful login, please click on "Authorize" and enter your access token.\n\nExample Code :

    fetch('/api/v1/home/news', { method: 'GET' })
        .then(response => response.json())
        .then(res => {
            // { status: 'true', result: [{...}] }
            console.log(res);
        });
    `)
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
