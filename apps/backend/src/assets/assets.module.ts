import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AssetsService } from "./assets.service";
import { AssetsController } from "./assets.controller";
import { RequestContextService } from "../common/tenant/request-context.service";
import { CacheService } from "../common/cache/cache.service";
import { DomainEventsService } from "../common/events/domain-events.service";

@Module({
  imports: [PrismaModule],
  controllers: [AssetsController],
  providers: [
    AssetsService,
    RequestContextService,
    CacheService,
    DomainEventsService,
  ],
  exports: [AssetsService],
})
export class AssetsModule {}
