import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortUrl')
  @Redirect()
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string): Promise<{ url: string }> {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);

    if (originalUrl) {
      return { url: originalUrl };
    } else {
      return { url: '/not-found' }; // Redirect to a not-found page or handle accordingly
    }
  }
}
