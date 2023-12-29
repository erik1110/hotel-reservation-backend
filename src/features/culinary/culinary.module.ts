import { Module } from '@nestjs/common';
import { CulinaryController } from './culinary.controller';
import { CulinaryService } from './culinary.service';
import { CulinarySchema } from './schemas/culinary.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Culinary', schema: CulinarySchema }])],
  controllers: [CulinaryController],
  providers: [CulinaryService]
})
export class CulinaryModule {}
