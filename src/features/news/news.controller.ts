import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { NewsService } from './news.service';
import {
  CreateNewsDto,
  CreateNewsSuccessDto,
  DeleteNewsSuccessDto,
  GetNewsSuccessDto,
  UpdateNewsSuccessDto,
} from './dto/news.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Home/News - 最新消息')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/api/v1/home/news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得所有最新消息' })
    @ApiOkResponse({ type: GetNewsSuccessDto })
    async getallNews(@Req() req: Request) {
      return await this.newsService.getallNews(req);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得單筆最新消息' })
    @ApiOkResponse({ type: GetNewsSuccessDto })
    async getOneNews(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request) {
        return await this.newsService.getOneNews(id, req);
    }

}

@ApiTags('Admin/News - 最新消息管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('api/v1/admin/news')
export class NewsAdminController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得所有最新消息 Get all latest news' })
  @ApiOkResponse({ type: GetNewsSuccessDto })
  async getallNews(@Req() req: Request) {
    return await this.newsService.getallNews(req);
  }

  @Post('')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '新增最新消息 Add latest news' })
  @ApiOkResponse({ type: CreateNewsSuccessDto })
  async addNews(@Req() req: Request, @Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.createNews(req, createNewsDto);
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新最新消息 Update latest news' })
  @ApiOkResponse({ type: UpdateNewsSuccessDto })
  async updateNews(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
    @Body() updateNewsDto: CreateNewsDto,
  ) {
    return await this.newsService.updateNews(id, req, updateNewsDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '刪除最新消息 Delete latest news' })
  @ApiOkResponse({ type: DeleteNewsSuccessDto })
  async deleteNews(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
  ) {
    return await this.newsService.deleteNews(id, req);
  }
}
