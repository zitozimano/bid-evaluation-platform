import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";
import { PrismaModule } from "../prisma/prisma.module";
import { RequestContextService } from "../common/tenant/request-context.service";

@Module({
  imports: [
    PrismaModule, // Needed for PrismaService injection
  ],
  controllers: [
    PublicController,
  ],
  providers: [
    PublicService,
    RequestContextService,
  ],
  exports: [
    PublicService,
  ],
})
export class PublicModule {}
