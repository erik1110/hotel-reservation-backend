import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INews } from './interfaces/news.interface';
import { CreateNewsDto } from './dto/news.dto';

@Injectable()
export class AdminNewsService {
    constructor(
        @InjectModel('New') private readonly newsModel: Model<INews>,
        ) {}

        async createNews(req: Request, createNewsDto: CreateNewsDto): Promise<INews> {
            const news = new this.newsModel(createNewsDto);
            const result = await news.save();
            return result;
        }
}
