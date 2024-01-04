import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRoom } from './interfaces/room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/room.dto';
import { getHttpResponse } from 'src/utils/successHandler';
import { AppError } from 'src/utils/appError';

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private readonly roomModel: Model<IRoom>) {}

    async getallRooms(req: Request) {
        const result = await this.roomModel.find({
            status: 1
        }, '_id');
        const ids = result.map(order => order._id.toString());
        return getHttpResponse.successResponse({
          message: '取得所有房型',
          data: ids,
        });
      }

    async getRoomById(id: string, req: Request) {
      const result = await this.roomModel.findOne({
          _id: id,
          status: 1
      });
      if (!result) {
        throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此房型不存在');
      }
      return getHttpResponse.successResponse({
        message: '取得單一房型',
        data: result,
      });
    }

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

      async updateRoom(id: string, req: Request, updateRoomDto: CreateRoomDto) {
        const result = await this.roomModel.findByIdAndUpdate(
          id,
          {
            name: updateRoomDto.name,
            description: updateRoomDto.description,
            image: updateRoomDto.imageUrl,
            imageUrlList: updateRoomDto.imageUrlList,
            areaInfo: updateRoomDto.areaInfo,
            bedInfo: updateRoomDto.bedInfo,
            maxPeople: updateRoomDto.maxPeople,
            price: updateRoomDto.price,
            facilityInfo: updateRoomDto.facilityInfo,
            amenityInfo: updateRoomDto.amenityInfo,
            creator: req['user']._id,
          },
          {
            new: true,
            runValidators: true,
          },
        );
        if (!result) {
          throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此房型不存在');
        }
        return getHttpResponse.successResponse({
          message: '更新房型',
          data: result,
        });
      }

    async deleteRoom(id: string, req: Request) {
    const result = await this.roomModel.findByIdAndUpdate(
        id,
        {
            status: -1,
        },
        {
            new: true,
            runValidators: true
        },
    );
    if (!result) {
        throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此房型不存在');
    }
    return getHttpResponse.successResponse({
        message: '刪除房型',
    });
    }

}
