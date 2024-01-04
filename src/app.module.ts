import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { NewsModule } from './features/news/news.module';
import { CulinaryModule } from './features/culinary/culinary.module';
import { AppController } from './app.controller';
import { RoomModule } from './features/room/room.module';
import { OrderService } from './features/order/order.service';
import { OrderModule } from './features/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    OrderModule,
    NewsModule,
    CulinaryModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
