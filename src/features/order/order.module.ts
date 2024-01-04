import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderAdminController, OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schemas/order.schema';
import { RoomSchema } from '../room/schemas/room.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchema },
            { name: 'Room', schema: RoomSchema },
        ]),
    ],
    controllers: [OrderController, OrderAdminController],
    providers: [OrderService]
  })
export class OrderModule {}
