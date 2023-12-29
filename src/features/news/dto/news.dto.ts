import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
    @ApiProperty({
      example: '秋季旅遊，豪華享受方案',
      description: 'Title',
    })
    @IsNotEmpty({ message: 'title 未填寫' })
    title: string;
  
    @ApiProperty({
      example: '秋天就是要來場豪華的旅遊...',
      description: 'Description',
    })
    @IsNotEmpty({ message: 'description 未填寫' })
    description: string;
  
    @ApiProperty({
      example: 'https://fakeimg.pl/300/',
      description: 'image 未填寫',
    })
    @IsNotEmpty({ message: 'image 未填寫' })
    image: string;
}

export class CreateNewsSuccessDto {
  @ApiProperty({ example: true})
  status: boolean;

  @ApiProperty({ example: '新增最新資訊'})
  message: string;

  @ApiProperty({ example: {
      _id: '658e628a4963529557a6561b',
      title: '秋季旅遊，豪華享受方案',
      description: '秋天就是要來場豪華的旅遊...',
      image: 'https://fakeimg.pl/300/',
      creator: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    }
  })
  data: object;
}
  
export class GetNewsSuccessDto {
  @ApiProperty({ example: true})
  status: boolean;

  @ApiProperty({ example: '取得所有資訊'})
  message: string;

  @ApiProperty({ example: [{
      _id: '658e628a4963529557a6561b',
      title: '秋季旅遊，豪華享受方案',
      description: '秋天就是要來場豪華的旅遊...',
      image: 'https://fakeimg.pl/300/',
      creator: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    }]
  })
  data: object;
}
  
export class DeleteNewsSuccessDto {
  @ApiProperty({ example: true})
  status: boolean;

  @ApiProperty({ example: '刪除最新資訊'})
  message: string;
}