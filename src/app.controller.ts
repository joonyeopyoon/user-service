import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Init' })
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
