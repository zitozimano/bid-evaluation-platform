import { Test, TestingModule } from '@nestjs/testing';
import { BbbeeController } from './bbbee.controller';

describe('BbbeeController', () => {
  let controller: BbbeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BbbeeController],
    }).compile();

    controller = module.get<BbbeeController>(BbbeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
