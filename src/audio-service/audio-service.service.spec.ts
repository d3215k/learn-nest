import { Test, TestingModule } from '@nestjs/testing';
import { AudioServiceService } from './audio-service.service';

describe('AudioServiceService', () => {
  let service: AudioServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioServiceService],
    }).compile();

    service = module.get<AudioServiceService>(AudioServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
