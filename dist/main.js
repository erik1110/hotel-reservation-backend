"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const errorHandler_1 = require("./utils/errorHandler");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new errorHandler_1.ErrorHandlerFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hotel Reservation Backend')
        .setDescription('This is my swagger document.')
        .setVersion('1.0')
        .addServer('http://localhost:3000', 'HTTP')
        .addServer('https://localhost', 'HTTPS')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map