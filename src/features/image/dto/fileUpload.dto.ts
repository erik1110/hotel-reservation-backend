import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class GetImageSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '取得圖片網址' })
  message: string;

  @ApiProperty({
    example: 'http://localhost:3000/api/v1/url/HSIARDTXC',
  })
  data: object;
}
