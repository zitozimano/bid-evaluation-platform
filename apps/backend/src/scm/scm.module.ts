import { Module } from "@nestjs/common";
import { ScmService } from "./scm.service";
import { ScmController } from "./scm.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [ScmController],
  providers: [ScmService, PrismaService],
  exports: [ScmService],
})
export class ScmModule {}
