import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
  ) {}

  @Get('/')
  getHello(): string {
    return "It's working!";
  }

  @Post('invoke-msg')
  getInvokeMsg(@Body('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
    return msg;
  }
}
