import { Module } from "@nestjs/common";
import { CouncilPackService } from "./council-pack.service";
import { CouncilPackController } from "./council-pack.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [CouncilPackController],
  providers: [CouncilPackService, PrismaService],
  exports: [CouncilPackService],
})
export class CouncilPackModule {}
