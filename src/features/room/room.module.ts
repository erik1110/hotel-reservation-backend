import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
