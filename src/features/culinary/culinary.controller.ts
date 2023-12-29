import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { CulinaryService } from './culinary.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCulinaryDto, CreateCulinarySuccessDto } from './dto/culinary.dto';


@ApiTags('Admin/Culinary - 美味佳餚管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'CriticalError', '系統錯誤，請洽系統管理員')
@Controller('admin/culinary')
export class CulinaryController {
    constructor(
        private readonly culinaryService: CulinaryService,
        ) {}

    @Post('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '新增美味佳餚 Add a new delicious dish'})
    @ApiOkResponse({ type: CreateCulinarySuccessDto })
    async addNews(@Req() req: Request, @Body() createCulinaryDto: CreateCulinaryDto) {
        return await this.culinaryService.createCulinary(req, createCulinaryDto);
    }
}
