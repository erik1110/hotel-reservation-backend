import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

const longDescription = `以竹葉為背景，一塊塊坍塌的黑白豆腐，看起來就像是…
熊貓在竹林裡玩耍！紅→白→黑！這是味覺的波狀攻擊！
在木筐底下架一張線網，在線網上放上一層豬油板，
再放上用黑豆做成未成形的黑豆腐，然後再放上一層豬油板，
再放上成未成形的白豆腐，然後是豬油板，如此反覆放上去，
形成「千層豆腐」。等豆腐固定成形後，再用炭火烤，
接著在木筐下面放一盤子，盤子放上麻婆醬汁，再放上竹葉，
再來只要將木筐迅速抬起，線網便會把豆腐切成一塊一塊，
最後把竹葉抽掉即可。`;

export class CreateCulinaryDto {
    @ApiProperty({
      example: '大魔術熊貓豆腐',
      description: 'Title',
    })
    @IsNotEmpty({ message: 'title 未填寫' })
    title: string;
  
    @ApiProperty({
      example: longDescription.replace(/(\r\n|\r|\n)/g, ' ').replace(/\s+/g, ' '),
      description: 'Description',
  })
    @IsNotEmpty({ message: 'description 未填寫' })
    description: string;

    @ApiProperty({
      example: 'SUN-MON 11:00-20:30',
      description: 'DiningTime',
    })
    @IsNotEmpty({ message: 'diningTime 未填寫' })
    diningTime: string;
  
    @ApiProperty({
      example: 'https://fakeimg.pl/300/',
      description: 'image 未填寫',
    })
    @IsNotEmpty({ message: 'image 未填寫' })
    @Matches(/^https:/, { message: 'image 必須以 https 開頭' })
    image: string;
}

export class CreateCulinarySuccessDto {
  @ApiProperty({ example: true})
  status: boolean;

  @ApiProperty({ example: '新增美味佳餚'})
  message: string;

  @ApiProperty({ example: {
      _id: '658e628a4963529557a6561b',
      title: '大魔術熊貓豆腐',
      description: longDescription.replace(/(\r\n|\r|\n)/g, ' ').replace(/\s+/g, ' '),
      diningTime: 'SUN-MON 11:00-20:30',
      image: 'https://fakeimg.pl/300/',
      creator: '658b9367df4b59a38f24e143',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    }
  })
  data: object;
}
  
export class GetCulinarySuccessDto {
  @ApiProperty({ example: true})
  status: boolean;

  @ApiProperty({ example: '取得所有美味佳餚'})
  message: string;

  @ApiProperty({ example: [{
    _id: '658e628a4963529557a6561b',
    title: '修改 - 海霸',
    description: '修改 - 以新鮮海產料理聞名...',
    diningTime: 'SUN-MON 11:00-20:30',
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

  @ApiProperty({ example: '刪除美味佳餚'})
  message: string;
}