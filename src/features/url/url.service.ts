import { Injectable } from '@nestjs/common';
import { IUrl } from './interfaces/url.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';

@Injectable()
export class UrlService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<IUrl>) {}

  async shortenUrl(originalUrl: string): Promise<string> {
    const existingUrl = await this.urlModel.findOne({ originalUrl }).exec();

    if (existingUrl) {
      return existingUrl.shortUrl;
    }

    const shortUrl = this.generateShortUrl(originalUrl);
    const newUrl = new this.urlModel({ originalUrl, shortUrl });
    await newUrl.save();

    return shortUrl;
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    const url = await this.urlModel.findOne({ shortUrl }).exec();

    return url ? url.originalUrl : null;
  }

  private generateShortUrl(originalUrl: string): string {
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
    return hash.slice(0, 8);
  }
}
