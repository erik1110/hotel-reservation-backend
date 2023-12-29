import { HttpStatus, Injectable } from '@nestjs/common';
import { ICulinary } from './interfaces/culinary.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getHttpResponse } from 'src/utils/successHandler';
import { CreateCulinaryDto } from './dto/culinary.dto';
import { AppError } from 'src/utils/appError';

@Injectable()
export class CulinaryService {
    constructor(
        @InjectModel('Culinary') private readonly culinaryModel: Model<ICulinary>,
        ) {}

        async createCulinary(req: Request, createCulinaryDto: CreateCulinaryDto) {
            const culinary = new this.culinaryModel(createCulinaryDto);
            culinary.creator = req['user']._id;
            const result = await culinary.save();
            return getHttpResponse.successResponse({
                message: '新增美味佳餚',
                data: result,
            })
        }

        async getallCulinary(req: Request) {
            const result = await this.culinaryModel.find();
            return getHttpResponse.successResponse({
                message: '取得所有美味佳餚',
                data: result,
            })
        }

        async updateCulinary(id: string, req: Request, updateCulinaryDto: CreateCulinaryDto) {
            const result = await this.culinaryModel.findByIdAndUpdate(
                id,
                {
                    title: updateCulinaryDto.title,
                    description: updateCulinaryDto.description,
                    diningTime: updateCulinaryDto.diningTime,
                    image: updateCulinaryDto.description,
                    creator: req['user']._id,
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!result) {
                throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此美味佳餚不存在');
            }
            return getHttpResponse.successResponse({
                message: '更新美味佳餚',
                data: result,
            })
        }
        async deleteCulinary(id: string, req: Request) {
            const result = await this.culinaryModel.findByIdAndDelete(id);
            if (!result) {
                throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此美味佳餚不存在');
            }
            return getHttpResponse.successResponse({
                message: '刪除美味佳餚',
            })
        }
}
