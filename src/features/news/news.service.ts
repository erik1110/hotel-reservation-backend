import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INews } from './interfaces/news.interface';
import { CreateNewsDto } from './dto/news.dto';
import { getHttpResponse } from 'src/utils/successHandler';

@Injectable()
export class AdminNewsService {
    constructor(
        @InjectModel('New') private readonly newsModel: Model<INews>,
        ) {}

        async createNews(req: Request, createNewsDto: CreateNewsDto) {
            const news = new this.newsModel(createNewsDto);
            news.creator = req["user"]._id;
            const result = await news.save();
            return getHttpResponse.successResponse({
                message: '新增最新資訊',
                data: result,
            })
        }

        async getallNews(req: Request) {
            const result = await this.newsModel.find();
            return getHttpResponse.successResponse({
                message: '取得所有資訊',
                data: result,
            })
        }
}
