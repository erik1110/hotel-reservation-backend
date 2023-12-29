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
