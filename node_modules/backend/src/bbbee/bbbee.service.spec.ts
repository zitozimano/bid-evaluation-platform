import { Test, TestingModule } from '@nestjs/testing';
import { BbbeeService } from './bbbee.service';

describe('BbbeeService', () => {
  let service: BbbeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BbbeeService],
    }).compile();

    service = module.get<BbbeeService>(BbbeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
