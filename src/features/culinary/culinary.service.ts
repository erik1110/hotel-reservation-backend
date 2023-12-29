import { Injectable } from '@nestjs/common';
import { ICulinary } from './interface/culinary.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getHttpResponse } from 'src/utils/successHandler';
import { CreateCulinaryDto } from './dto/culinary.dto';

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
}
