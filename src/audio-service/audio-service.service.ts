import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioServiceService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}
