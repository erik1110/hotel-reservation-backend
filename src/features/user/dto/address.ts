import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { zipCityList, zipCodeList, zipCountyList } from "src/utils/zipcodes";

export class AddressDto {
    @ApiProperty({
      example: 100,
      description: 'Zip Code',
    })
    @IsNotEmpty({ message: 'Zip Code is Null' })
    @IsIn(zipCodeList, { message: 'Invalid Zip Code' })
    zipcode: number;
  
    @ApiProperty({
      example: '中正區',
      description: 'County',
    })
    @IsNotEmpty({ message: 'County is Null' })
    @IsIn(zipCountyList, { message: 'Invalid County' })
    county: string;
  
    @ApiProperty({
      example: '臺北市',
      description: 'City',
    })
    @IsNotEmpty({ message: 'City is Null' })
    @IsIn(zipCityList, { message: 'Invalid City' })
    city: string;
  }
