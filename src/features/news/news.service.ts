import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INews } from './interfaces/news.interface';
import { CreateNewsDto } from './dto/news.dto';
import { getHttpResponse } from 'src/utils/successHandler';
import { AppError } from 'src/utils/appError';

@Injectable()
export class NewsService {
  constructor(@InjectModel('New') private readonly newsModel: Model<INews>) {}

  async createNews(req: Request, createNewsDto: CreateNewsDto) {
    const news = new this.newsModel(createNewsDto);
    news.creator = req['user']._id;
    const result = await news.save();
    return getHttpResponse.successResponse({
      message: '新增最新資訊',
      data: result,
    });
  }

  async getallNews(req: Request) {
    const result = await this.newsModel.find();
    return getHttpResponse.successResponse({
      message: '取得所有資訊',
      data: result,
    });
  }

  async updateNews(id: string, req: Request, updateNewsDto: CreateNewsDto) {
    const result = await this.newsModel.findByIdAndUpdate(
      id,
      {
        title: updateNewsDto.title,
        description: updateNewsDto.description,
        image: updateNewsDto.description,
        creator: req['user']._id,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!result) {
      throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此最新消息不存在');
    }
    return getHttpResponse.successResponse({
      message: '更新最新資訊',
      data: result,
    });
  }

  async deleteNews(id: string, req: Request) {
    const result = await this.newsModel.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(HttpStatus.NOT_FOUND, 'UserError', '此最新消息不存在');
    }
    return getHttpResponse.successResponse({
      message: '刪除最新資訊',
    });
  }
}
