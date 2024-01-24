import { Controller, Get, HttpStatus, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { ApiErrorDecorator } from 'src/common/decorators/error/error.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/utils/appError';

@ApiTags('ShortenURL - 短網址')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('/api/v1/url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortUrl')
  @ApiOperation({ summary: '轉址短網址 Redirect short URL' })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'UserError', '無此網址或網址已失效')
  @Redirect()
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string): Promise<{ url: string }> {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);

    if (originalUrl) {
      return { url: originalUrl };
    } else {
      throw new AppError(HttpStatus.BAD_REQUEST, 'UserError', '無此網址或網址已失效');
    }
  }
}
