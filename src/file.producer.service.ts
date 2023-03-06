import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue('file-operation-queue') private queue: Queue) {}

  async deleteFile(fileName: string) {
    const filePath = `C:/Users/d3215/OneDrive/Documents/Files/${fileName}`;
    // implementh logic delete the file record from database.
    await this.queue.add(
      'delete-file',
      {
        filePath: filePath,
      },
      { delay: 10000 },
    );
  }
}
