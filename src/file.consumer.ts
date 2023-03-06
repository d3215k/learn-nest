import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as fs from 'fs';

@Processor('file-operation-queue')
export class FileConsumer {
  private readonly logger = new Logger(FileConsumer.name);

  @Process('delete-file')
  async filedeletionJob(job: Job<unknown>) {
    const jobData: any = job.data;
    fs.unlinkSync(jobData.filePath);
    this.logger.debug(`File ${jobData.filePath} deleted.`);
  }
}
