import { Test, TestingModule } from '@nestjs/testing';
import { BiddersController } from './bidders.controller';

describe('BiddersController', () => {
  let controller: BiddersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiddersController],
    }).compile();

    controller = module.get<BiddersController>(BiddersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
