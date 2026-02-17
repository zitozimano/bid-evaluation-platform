import { Test, TestingModule } from "@nestjs/testing";
import { EvaluationService } from "./evaluation.service";
import { PrismaService } from "../prisma/prisma.service";

describe("EvaluationService", () => {
  let service: EvaluationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService, PrismaService],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("computeBbbeePoints should give higher points for lower level", () => {
    const w = 10;
    const lvl1 = service.computeBbbeePoints(1, w);
    const lvl8 = service.computeBbbeePoints(8, w);
    expect(lvl1).toBeGreaterThan(lvl8);
  });
});
