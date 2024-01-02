import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { RoomService } from './room.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateRoomDto, CreateRoomSuccessDto } from './dto/room.dto';


@ApiTags('Admin/Rooms - 房型管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('api/v1/rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '新增最新房型 Add a latest room' })
    @ApiOkResponse({ type: CreateRoomSuccessDto })
    async addNews(@Req() req: Request, @Body() createNewsDto: CreateRoomDto) {
      return await this.roomService.createRoom(req, createNewsDto);
    }
}
