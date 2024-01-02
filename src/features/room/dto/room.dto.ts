import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({
    example: '尊爵雙人房',
    description: 'name',
  })
  @IsNotEmpty({ message: 'name 未填寫' })
  name: string;

  @ApiProperty({
    example: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    description: 'Description',
  })
  @IsNotEmpty({ message: 'description 未填寫' })
  description: string;

  @ApiProperty({
    example: 'https://fakeimg.pl/300/',
    description: 'image 未填寫',
  })
  @IsNotEmpty({ message: 'image 未填寫' })
  @Matches(/^https:/, { message: 'image 必須以 https 開頭' })
  imageUrl: string;

  @ApiProperty({
    example: [
      'https://fakeimg.pl/300/',
      'https://fakeimg.pl/301/',
      'https://fakeimg.pl/302/'
    ],
    description: 'imageUrlList 未填寫',
  })
  @IsArray({ message: 'imageUrlList 必須是一個串列' })
  @IsNotEmpty({ message: 'imageUrlList 未填寫' })
  @IsString({ each: true, message: 'imageUrlList 的每個元素必須是字串' })
  imageUrlList: string[];

  @ApiProperty({
    example: '24坪',
    description: 'areaInfo',
  })
  @IsNotEmpty({ message: 'areaInfo 未填寫' })
  areaInfo: string;

  @ApiProperty({
    example: '一張大床',
    description: 'bedInfo',
  })
  @IsNotEmpty({ message: 'bedInfo 未填寫' })
  bedInfo: string;

  @ApiProperty({
    example: 4,
    description: 'maxPeople',
  })
  @IsNotEmpty({ message: 'maxPeople 未填寫' })
  maxPeople: number;

  @ApiProperty({
    example: 10000,
    description: 'price',
  })
  @IsNotEmpty({ message: 'price 未填寫' })
  price: number;

  @ApiProperty({
    type: ItemDto,
    example: [{
      title: '平面電視',
      isProvide: true,
    }],
    description: 'Address',
  })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  facilityInfo: ItemDto;

  @ApiProperty({
    type: ItemDto,
    example: [{
      title: '衛生紙',
      isProvide: true,
    }],
    description: 'Address',
  })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  amenityInfo: ItemDto;
}



export class CreateRoomSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '新增房型' })
  message: string;

  @ApiProperty({
    example: {
      _id: '658e628a4963529557a6561b',
      name: '尊爵雙人房',
      description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
      imageUrl: 'https://fakeimg.pl/300/',
      imageUrlList: ['https://fakeimg.pl/300/',
                     'https://fakeimg.pl/301/',
                     'https://fakeimg.pl/302/'
      ],
      areaInfo: '24坪',
      bedInfo: '一張大床',
      maxPeople: 4,
      price: 10000,
      status: 1,
      facilityInfo: [
        {
          title: '平面電視',
          isProvide: true,
        }
      ],
      amenityInfo: [
        {
          title: '衛生紙',
          isProvide: true,
        }
      ],
      creator: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    },
  })
  data: object;
}

export class GetRoomSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '取得所有房型' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '658e628a4963529557a6561b',
        name: '尊爵雙人房',
        description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
        imageUrl: 'https://fakeimg.pl/300/',
        imageUrlList: ['https://fakeimg.pl/300/',
                       'https://fakeimg.pl/301/',
                       'https://fakeimg.pl/302/'
        ],
        areaInfo: '24坪',
        bedInfo: '一張大床',
        maxPeople: 4,
        price: 10000,
        status: 1,
        facilityInfo: [
          {
            title: '平面電視',
            isProvide: true,
          }
        ],
        amenityInfo: [
          {
            title: '衛生紙',
            isProvide: true,
          }
        ],
        creator: '658b9367df4b59a38f24e143',
        createdAt: '2023-12-27T03:00:55.922Z',
        updatedAt: '2023-12-28T04:01:21.006Z',
      },
    ],
  })
  data: object;
}

export class UpdateRoomSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '更新房型' })
  message: string;

  @ApiProperty({
    example: {
      _id: '658e628a4963529557a6561b',
      name: '尊爵雙人房',
      description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
      imageUrl: 'https://fakeimg.pl/300/',
      imageUrlList: ['https://fakeimg.pl/300/',
                     'https://fakeimg.pl/301/',
                     'https://fakeimg.pl/302/'
      ],
      areaInfo: '24坪',
      bedInfo: '一張大床',
      maxPeople: 4,
      price: 10000,
      status: 1,
      facilityInfo: [
        {
          title: '平面電視',
          isProvide: true,
        }
      ],
      amenityInfo: [
        {
          title: '衛生紙',
          isProvide: true,
        }
      ],
      creator: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    },
  })
  data: object;
}

export class DeleteRoomSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '刪除房型' })
  message: string;
}
