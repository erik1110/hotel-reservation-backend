import { Controller, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto, GetImageSuccessDto } from './dto/fileUpload.dto';
import { UrlService } from '../url/url.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiErrorDecorator } from 'src/common/decorators/error/error.decorator';
import { getHttpResponse } from 'src/utils/successHandler';

@ApiTags('Image - 上傳圖片')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/api/v1/image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService,
        private readonly urlService: UrlService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '上傳圖片 Upload an image' })
    @ApiCreatedResponse({ type: GetImageSuccessDto })
    @ApiBody({
        description: "網址會由該服務進行轉址 The URL will be redirected by the service.",
        type: FileUploadDto,
    })
    async uploadImage(@UploadedFile() file){
        const imageUrl = await this.imageService.uploadImage(file);
        let shortenUrl = await this.urlService.shortenUrl(imageUrl)
        if (process.env.NODE_ENV === 'dev') {
            shortenUrl = `http://localhost:${process.env.PORT}/api/v1/url/`;
        } else {
            shortenUrl = `${process.env.PRODUCTION_URL}/api/v1/url/`;
        }
    
        const shortenedUrl = await this.urlService.shortenUrl(imageUrl);
        const redirectUrl = shortenUrl + shortenedUrl;
        return getHttpResponse.successResponse({
            message: '取得圖片網址',
            data: redirectUrl,
        });
    }
}
