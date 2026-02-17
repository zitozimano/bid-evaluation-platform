import { Test } from "@nestjs/testing";
import { EvaluationService } from "../src/evaluation/evaluation.service";
import { PrismaService } from "../src/prisma/prisma.service";

describe("EvaluationService", () => {
  let service: EvaluationService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EvaluationService, PrismaService],
    }).compile();

    service = moduleRef.get(EvaluationService);
    prisma = moduleRef.get(PrismaService);
  });

  it("returns null when tender not found for council pack v2", async () => {
    jest.spyOn(prisma.tender, "findUnique").mockResolvedValue(null as any);
    const result = await service.getCouncilPackV2("missing-id");
    expect(result).toBeNull();
  });

  it("generates PDF buffer for council pack v2", async () => {
    jest.spyOn(prisma.tender, "findUnique").mockResolvedValue({
      id: "t1",
      number: "BID-001",
      description: "Test tender",
    } as any);

    jest.spyOn(prisma.bidder, "findMany").mockResolvedValue([
      { id: "b1", name: "Bidder 1" },
    ] as any);

    jest.spyOn(prisma.bidderScore, "findMany").mockResolvedValue([
      { bidderId: "b1", criterion: "Price", score: 80 },
      { bidderId: "b1", criterion: "Functionality", score: 15 },
    ] as any);

    const pdf = await service.generateCouncilPackV2Pdf("t1");
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf!.length).toBeGreaterThan(0);
  });
});
