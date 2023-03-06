import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FileProducerService } from './file.producer.service';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
    private readonly fileProducerService: FileProducerService,
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

  @Post('remove-file')
  async deleteFile(@Body('fileName') fileName: string) {
    await this.fileProducerService.deleteFile(fileName);
    return 'File deleted';
  }
}
