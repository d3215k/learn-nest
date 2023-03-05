import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    return "It's working!";
  }
}
