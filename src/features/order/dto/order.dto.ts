import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, Matches, ValidateNested, ValidationOptions, registerDecorator } from 'class-validator';
import { Schema } from 'mongoose';
import { UserDto } from './user.dto';
import { IsBefore, IsNotBeforeToday } from 'src/common/decorator/validation/dto.decorator';

export class CreateOrderDto {
  @ApiProperty({
    example: '6579516fcd9cb68b22599e9e',
    description: 'roomId',
  })
  @IsNotEmpty({ message: 'roomId 未填寫' })
  roomId: Schema.Types.ObjectId;

  @ApiProperty({
    example: '2023/06/18',
    description: 'checkInDate',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsNotBeforeToday({ message: 'checkInDate 不得小於今天' })
  @IsDate({ message: 'checkInDate 格式不正確' })
  checkInDate: Date;

  @ApiProperty({
    example: '2023/06/18',
    description: 'checkOutDate',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'checkOutDate 格式不正確' })
  @IsBefore('checkInDate', { message: 'checkInDate 不得大於等於 checkOutDate' })
  checkOutDate: Date;

  @ApiProperty({
    example: 2,
    description: 'peopleNum',
  })
  @IsNotEmpty({ message: 'peopleNum 未填寫' })
  peopleNum: number;

  @ApiProperty({
    type: UserDto,
    description: 'userInfo',
  })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  userInfo: UserDto;

}

export class CreateOrderSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '新增訂單' })
  message: string;

  @ApiProperty({
    example: {
      userInfo: {
        address: {
          zipcode: 100,
          county: '中正區',
          city: '臺北市',
        },
        name: 'john',
        phone: '0912345678',
        email: 'test@example.com',
      },
      _id: '6579516fcd9cb68b22599e9e',
      roomId: '6593d28d455420d4f19b23f8',
      checkInDate: '2023-06-17T16:00:00.000Z',
      checkOutDate: '2023-06-18T16:00:00.000Z',
      peopleNum: 2,
      orderUserId: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    },
  })
  data: object;
}

export class GetOrderSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '取得所有訂單' })
  message: string;

  @ApiProperty({
    example: [
      {
        userInfo: {
          address: {
            zipcode: 100,
            county: '中正區',
            city: '臺北市',
          },
          name: 'john',
          phone: '0912345678',
          email: 'test@example.com',
        },
        _id: '6579516fcd9cb68b22599e9e',
        roomId: '6593d28d455420d4f19b23f8',
        checkInDate: '2023-06-17T16:00:00.000Z',
        checkOutDate: '2023-06-18T16:00:00.000Z',
        peopleNum: 2,
        orderUserId: '658b9367df4b59a38f24e143',
        createdAt: '2023-12-27T03:00:55.922Z',
        updatedAt: '2023-12-28T04:01:21.006Z',
        status: 1,
      },
    ],
  })
  data: object;
}

export class UpdateOrderSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '更新訂單' })
  message: string;

  @ApiProperty({
    example: {
      userInfo: {
        address: {
          zipcode: 100,
          county: '中正區',
          city: '臺北市',
        },
        name: 'john',
        phone: '0912345678',
        email: 'test@example.com',
      },
      _id: '6579516fcd9cb68b22599e9e',
      roomId: '6593d28d455420d4f19b23f8',
      checkInDate: '2023-06-17T16:00:00.000Z',
      checkOutDate: '2023-06-18T16:00:00.000Z',
      peopleNum: 2,
      orderUserId: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    },
  })
  data: object;
}

export class DeleteOrderSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '刪除訂單' })
  message: string;
}
