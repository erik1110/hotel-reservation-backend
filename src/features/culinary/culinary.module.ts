import { Module } from '@nestjs/common';
import { CulinaryController } from './culinary.controller';
import { CulinaryService } from './culinary.service';

@Module({
  controllers: [CulinaryController],
  providers: [CulinaryService]
})
export class CulinaryModule {}
