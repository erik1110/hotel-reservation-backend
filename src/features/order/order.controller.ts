import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { OrderService } from './order.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateOrderDto, CreateOrderSuccessDto, DeleteOrderSuccessDto, GetOneOrderSuccessDto, GetOrderSuccessDto, UpdateOrderSuccessDto } from './dto/order.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsObjectIdPipe } from 'nestjs-object-id';


@ApiTags('Orders - 訂單')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/api/v1/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}


    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得自己的訂單列表 Get My Orders (刪除狀態訂單無法查詢)' })
    @ApiOkResponse({ type: GetOrderSuccessDto })
    async getMyOrders(@Req() req: Request) {
      return await this.orderService.getMyOrders(req);
    }

    @Post('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '新增訂單 Add an order' })
    @ApiOkResponse({ type: CreateOrderSuccessDto })
    async addOrder(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
      return await this.orderService.createOrder(req, createOrderDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得自己訂單詳細資料 Get My Orders Detail ' })
    @ApiOkResponse({ type: GetOneOrderSuccessDto })
    async getMyOrderDetail(
        @Param('id', IsObjectIdPipe) id: string,
        @Req() req: Request) {
      return await this.orderService.getMyOrderDetail(id, req);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '刪除自己訂單 Delete My order' })
    @ApiOkResponse({ type: DeleteOrderSuccessDto })
    async deleteNews(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request,
    ) {
      return await this.orderService.deleteMyOrder(id, req);
    }
}


@ApiTags('Admin/Orders - 訂單管理')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiErrorDecorator(HttpStatus.FORBIDDEN, 'ForbiddenException', 'Forbidden')
@ApiErrorDecorator(
  HttpStatus.INTERNAL_SERVER_ERROR,
  'CriticalError',
  '系統錯誤，請洽系統管理員',
)
@Controller('/api/v1/admin/orders')
export class OrderAdminController {
    constructor(private readonly orderService: OrderService) {}

    @Get('')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得所有訂單 Get all orders (包含刪除狀態的訂單)' })
    @ApiOkResponse({ type: GetOrderSuccessDto })
    async getallOrders(@Req() req: Request) {
      return await this.orderService.getallOrders(req);
    }

    @Get(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '取得訂單詳細資料 Get My Orders Detail (包含刪除狀態的訂單)' })
    @ApiOkResponse({ type: GetOneOrderSuccessDto })
    async getMyOrderDetail(
        @Param('id', IsObjectIdPipe) id: string,
        @Req() req: Request) {
      return await this.orderService.getMyOrderAdmin(id, req);
    }

    @Put(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '修改訂單 Update the order' })
    @ApiOkResponse({ type: UpdateOrderSuccessDto })
    async updateOrderAdmin(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request,
      @Body() updateOrderDto: CreateOrderDto,
    ) {
      return await this.orderService.updateOrderAdmin(id, req, updateOrderDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '刪除訂單 Delete My order' })
    @ApiOkResponse({ type: DeleteOrderSuccessDto })
    async deleteOrderAdmin(
      @Param('id', IsObjectIdPipe) id: string,
      @Req() req: Request,
    ) {
      return await this.orderService.deleteOrderAdmin(id, req);
    }
}
