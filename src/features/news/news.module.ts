import { Module } from '@nestjs/common';
import { NewsAdminController, NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.schema';
import { NewsService } from './news.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'New', schema: NewsSchema }])],
  controllers: [NewsController, NewsAdminController],
  providers: [NewsService],
})
export class NewsModule {}
