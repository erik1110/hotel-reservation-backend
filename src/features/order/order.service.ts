import { HttpStatus, Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { getHttpResponse } from 'src/utils/successHandler';
import { IRoom } from '../room/interfaces/room.interface';
import { AppError } from 'src/utils/appError';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>,
                @InjectModel('Room') private readonly roomModel: Model<IRoom>) {}
    

    async createOrder(req: Request, createOrderDto: CreateOrderDto) {
        // 檢查房間是否存在
        const room = await this.roomModel.findOne({ _id: createOrderDto.roomId });
        if (!room) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此房型不存在');
        }
        // 檢查訂房人數
        if (createOrderDto.peopleNum > room.maxPeople) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '超出該房型最大訂房人數');
        }
        // 檢查房間該時段是否被預訂
        const existingOrders = await this.orderModel.find({
            roomId: createOrderDto.roomId,
            $or: [
                { checkInDate: { $lt: createOrderDto.checkOutDate }, checkOutDate: { $gt: createOrderDto.checkInDate } },
                { checkInDate: { $lt: createOrderDto.checkInDate }, checkOutDate: { $gt: createOrderDto.checkOutDate } },
            ],
        });
        if (existingOrders.length > 0) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '該房型已被預定');
        }
        // 建立訂單
        const order = new this.orderModel(createOrderDto);
        order.orderUserId = req['user']._id;
        order.status = 1
        const result = await order.save();
        return getHttpResponse.successResponse({
          message: '新增訂單',
          data: result,
        });
      }

    async getallOrders(req: Request) {
        const result = await this.orderModel.find({});
        const ids = result.map(order => order._id.toString());
        return getHttpResponse.successResponse({
            message: '取得所有訂單',
            data: ids,
        });
    }

    async getMyOrders(req: Request) {
        const orderUserId = req['user']._id;
        const result = await this.orderModel.find({
            orderUserId: orderUserId,
            status: 1,
        }, '_id');
        const ids = result.map(order => order._id.toString());
        return getHttpResponse.successResponse({
            message: '取得所有訂單',
            data: ids,
        });
    }

    async getMyOrderDetail(id: string, req: Request) {
        const result = await this.orderModel.findOne({
            _id: id,
            status: 1,
        });
        if (!result) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單不存在或已刪除');
        }
        return getHttpResponse.successResponse({
            message: '取得訂單詳細資料',
            data: result,
        });
    }

    async deleteMyOrder(id: string, req: Request) {
        const result = await this.orderModel.findByIdAndUpdate(
            {
                _id: id,
                orderUserId: req['user']._id,
            },
            {
                status: -1,
            },
            {
                new: true,
                runValidators: true
            },
        );
        if (!result) {
          throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單不存在');
        } else if (result.status==-1) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單已被刪除');
        }
        return getHttpResponse.successResponse({
          message: '刪除訂單',
        });
      }

    async deleteOrderAdmin(id: string, req: Request) {
        const result = await this.orderModel.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                status: -1,
            },
            {
                new: true,
                runValidators: true
            },
        );
        if (!result) {
          throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單不存在');
        } else if (result.status==-1) {
          throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單已被刪除');
        }
        return getHttpResponse.successResponse({
          message: '刪除訂單',
        });
      }

      async updateOrderAdmin(id: string, req: Request, updateOrderDto: CreateOrderDto) {
        // 檢查房間是否存在
        const room = await this.roomModel.findOne({ _id: updateOrderDto.roomId });
        if (!room) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此房型不存在');
        }
        // 檢查訂房人數
        if (updateOrderDto.peopleNum > room.maxPeople) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '超出該房型最大訂房人數');
        }
        // 檢查房間該時段是否被預訂
        const existingOrders = await this.orderModel.find({
            roomId: updateOrderDto.roomId,
            $or: [
                { checkInDate: { $lt: updateOrderDto.checkOutDate }, checkOutDate: { $gt: updateOrderDto.checkInDate } },
                { checkInDate: { $lt: updateOrderDto.checkInDate }, checkOutDate: { $gt: updateOrderDto.checkOutDate } },
            ],
        });
        if (existingOrders.length > 0) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '該房型已被預定');
        }
        // 更新訂單
        const result = await this.orderModel.findByIdAndUpdate(
            id,
            {
              roomId: updateOrderDto.roomId,
              checkInDate: updateOrderDto.checkInDate,
              checkOutDate: updateOrderDto.checkOutDate,
              peopleNum: updateOrderDto.peopleNum,
              userInfo: updateOrderDto.userInfo,
            },
            {
              new: true,
              runValidators: true,
            },
          );
          if (!result) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單不存在');
          }
          return getHttpResponse.successResponse({
            message: '更新訂單',
            data: result,
          });
      }

      async getMyOrderAdmin(id: string, req: Request) {
        const result = await this.orderModel.findOne({
            _id: id,
        });
        if (!result) {
            throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此訂單不存在');
        }
        return getHttpResponse.successResponse({
            message: '取得訂單詳細資料',
            data: result,
        });
    }

}
