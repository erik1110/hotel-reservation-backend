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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiErrorDecorator } from 'src/common/decorators/error/error.decorator';
import { CulinaryService } from './culinary.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  CreateCulinaryDto,
  CreateCulinarySuccessDto,
  DeleteCulinarySuccessDto,
  GetCulinarySuccessDto,
  GetOneCulinarySuccessDto,
  UpdateCulinaryDto,
  UpdateCulinarySuccessDto,
} from './dto/culinary.dto';
import { IsObjectIdPipe } from 'nestjs-object-id';

@ApiTags('Home/Culinary - 美味佳餚')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('/api/v1/home/culinary')
export class CulinaryController {
  constructor(private readonly culinaryService: CulinaryService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得所有美味佳餚 Get all delicious dishes' })
  @ApiOkResponse({ type: GetCulinarySuccessDto })
  async getallCulinary(@Req() req: Request) {
    return await this.culinaryService.getallCulinary(req);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得單筆美味佳餚 Get one delicious dish' })
  @ApiOkResponse({ type: GetOneCulinarySuccessDto })
  async getOneCulinary(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
  ) {
    return await this.culinaryService.getOneCulinary(id, req);
  }
}

@ApiTags('Admin/Culinary - 美味佳餚管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('api/v1/admin/culinary')
export class CulinaryAdminController {
  constructor(private readonly culinaryService: CulinaryService) {}

  @Get('')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得所有美味佳餚 Get all delicious dishes' })
  @ApiOkResponse({ type: GetCulinarySuccessDto })
  async getallCulinary(@Req() req: Request) {
    return await this.culinaryService.getallCulinary(req);
  }

  @Post('')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '新增美味佳餚 Add a new delicious dish' })
  @ApiOkResponse({ type: CreateCulinarySuccessDto })
  async addCulinary(
    @Req() req: Request,
    @Body() createCulinaryDto: CreateCulinaryDto,
  ) {
    return await this.culinaryService.createCulinary(req, createCulinaryDto);
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新美味佳餚 Update a delicious dish' })
  @ApiOkResponse({ type: UpdateCulinarySuccessDto })
  async updateCulinary(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
    @Body() updateCulinaryDto: UpdateCulinaryDto,
  ) {
    return await this.culinaryService.updateCulinary(
      id,
      req,
      updateCulinaryDto,
    );
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '刪除美味佳餚 Delete a delicious dish' })
  @ApiOkResponse({ type: DeleteCulinarySuccessDto })
  async deleteNews(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
  ) {
    return await this.culinaryService.deleteCulinary(id, req);
  }
}
