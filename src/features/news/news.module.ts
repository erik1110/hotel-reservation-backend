import { Module } from '@nestjs/common';
import { AdminNewsController } from './news.controller';
import { AdminNewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'New', schema: NewsSchema }])],
  controllers: [AdminNewsController],
  providers: [AdminNewsService]
})
export class NewsModule {}
