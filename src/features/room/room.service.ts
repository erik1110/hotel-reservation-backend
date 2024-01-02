import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRoom } from './interfaces/room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/room.dto';
import { getHttpResponse } from 'src/utils/successHandler';

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private readonly roomModel: Model<IRoom>) {}

    async createRoom(req: Request, createRoomDto: CreateRoomDto) {
        const room = new this.roomModel(createRoomDto);
        room.status = 1
        room.creator = req['user']._id;
        const result = await room.save();
        return getHttpResponse.successResponse({
          message: '新增房型',
          data: result,
        });
      }

}
