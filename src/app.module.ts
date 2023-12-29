import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { ArticleModule } from './features/article/article.module';
import { NewsModule } from './features/news/news.module';
import { CulinaryModule } from './features/culinary/culinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
    UserModule,
    ArticleModule,
    NewsModule,
    CulinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
