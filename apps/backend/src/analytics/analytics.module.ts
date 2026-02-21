import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AnalyticsMiddleware } from "./analytics.middleware";

@Module({
  providers: [PrismaService],
})
export class AnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnalyticsMiddleware).forRoutes("*");
  }
}
