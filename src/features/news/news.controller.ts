import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { AdminNewsService } from './news.service';
import { CreateNewsDto, CreateNewsSuccessDto, GetNewsSuccessDto } from './dto/news.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Admin/News - 最新消息管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'CriticalError', '系統錯誤，請洽系統管理員')
@Controller('admin/news')
export class AdminNewsController {
    constructor(
        private readonly adminNewsService: AdminNewsService,
        ) {}

    @Get('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '取得所有最新消息 Get all news'})
    @ApiOkResponse({ type: GetNewsSuccessDto })
    async getallNews(@Req() req: Request) {
        return await this.adminNewsService.getallNews(req);
    }

    @Post('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '新增最新消息 Add latest news'})
    @ApiOkResponse({ type: CreateNewsSuccessDto })
    async addNews(@Req() req: Request, @Body() createNewsDto: CreateNewsDto) {
        return await this.adminNewsService.createNews(req, createNewsDto);
    }

}
