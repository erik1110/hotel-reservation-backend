import { Get, Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: '健康檢查 Health Check' })
  root(): string {
    return 'Health Check';
  }
}
