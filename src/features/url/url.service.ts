import { Injectable } from '@nestjs/common';
import { IUrl } from './interfaces/url.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
    constructor(@InjectModel('Url') private readonly urlModel: Model<IUrl>){}

    async shortenUrl(originalUrl: string): Promise<string> {
        const existingUrl = await this.urlModel.findOne({ originalUrl }).exec();
    
        if (existingUrl) {
          return existingUrl.shortUrl;
        }
    
        const shortUrl = shortid.generate();
        const newUrl = new this.urlModel({ originalUrl, shortUrl });
        await newUrl.save();
    
        return shortUrl;
      }
    
    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        const url = await this.urlModel.findOne({ shortUrl }).exec();

        return url ? url.originalUrl : null;
    }
}
