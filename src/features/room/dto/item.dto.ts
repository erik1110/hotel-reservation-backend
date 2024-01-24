import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ItemDto {
  @IsNotEmpty({ message: 'title 未填寫' })
  title: string;

  @IsNotEmpty({ message: 'isProvide 未填寫' })
  isProvide: boolean;
}
