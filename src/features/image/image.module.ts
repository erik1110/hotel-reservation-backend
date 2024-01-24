import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [ImageController],
  providers: [FirebaseService, ImageService],
})
export class ImageModule {}
