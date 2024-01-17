import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiErrorDecorator } from 'src/common/decorators/error/error.decorator';
import { RoomService } from './room.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateRoomDto, CreateRoomSuccessDto, DeleteRoomSuccessDto, GetOneRoomSuccessDto, GetRoomSuccessDto, UpdateRoomSuccessDto } from './dto/room.dto';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Rooms - 房型')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('/api/v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得所有房型 Get all rooms' })
  @ApiOkResponse({ type: GetRoomSuccessDto })
  async getallRooms(@Req() req: Request) {
    return await this.roomService.getallRooms(req);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取得單一房型 Get a room' })
  @ApiOkResponse({ type: GetOneRoomSuccessDto })
  async getRoomById(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request) {
    return await this.roomService.getRoomById(id, req);
  }

}

@ApiTags('Admin/Rooms - 房型管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('api/v1/admin/rooms')
export class RoomAdminController {
    constructor(private readonly roomService: RoomService) {}

    @Get('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得所有房型 Get all rooms' })
    @ApiOkResponse({ type: GetRoomSuccessDto })
    async getallNews(@Req() req: Request) {
      return await this.roomService.getallRooms(req);
    }

    @Post('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '新增最新房型 Add a room' })
    @ApiOkResponse({ type: CreateRoomSuccessDto })
    async addNews(@Req() req: Request, @Body() createNewsDto: CreateRoomDto) {
      return await this.roomService.createRoom(req, createNewsDto);
    }

    @Put(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '更新最新消息 Update latest news' })
    @ApiOkResponse({ type: UpdateRoomSuccessDto })
    async updateNews(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request,
      @Body() updateNewsDto: CreateRoomDto,
    ) {
      return await this.roomService.updateRoom(id, req, updateNewsDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '刪除最新消息 Delete latest news' })
    @ApiOkResponse({ type: DeleteRoomSuccessDto })
    async deleteNews(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request,
    ) {
      return await this.roomService.deleteRoom(id, req);
    }
}
