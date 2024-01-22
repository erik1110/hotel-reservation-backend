import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/fileUpload.dto';
import { UrlService } from '../url/url.service';

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService,
        private readonly urlService: UrlService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload an image file',
        type: FileUploadDto,
    })
    async uploadImage(@UploadedFile() file){
        const imageUrl = await this.imageService.uploadImage(file);
        const shortenUrl = await this.urlService.shortenUrl(imageUrl)
        return { shortenUrl };
    }
}
