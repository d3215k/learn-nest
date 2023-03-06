import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  @Process('message-job')
  readOperationJob(job: Job<{ text: string }>) {
    this.logger.debug(job.data.text);
  }
}
