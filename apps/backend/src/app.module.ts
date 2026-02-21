import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { TendersModule } from "./tenders/tenders.module";
import { EvaluationModule } from "./evaluation/evaluation.module";
import { DocumentsModule } from "./documents/documents.module";
import { AuditModule } from "./audit/audit.module";
import { AdminModule } from "./admin/admin.module";

import { ReportsModule } from "./reports/reports.module";
import { ReportQueueModule } from "./reports/report-queue.module";

import { PublicModule } from "./public/public.module";
import { AssetsModule } from "./assets/assets.module";

import { TenantMiddleware } from "./common/tenant/tenant.middleware";
import { CacheService } from "./common/cache/cache.service";
import { DomainEventsService } from "./common/events/domain-events.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    PrismaModule,
    AuthModule,
    TendersModule,
    EvaluationModule,
    DocumentsModule,
    AuditModule,
    AdminModule,

    ReportsModule,
    ReportQueueModule,

    PublicModule,
    AssetsModule,
  ],
  providers: [CacheService, DomainEventsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes("*");
  }
}
