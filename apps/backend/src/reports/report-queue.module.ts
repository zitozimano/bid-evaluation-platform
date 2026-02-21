import { Module } from "@nestjs/common";
import { ReportQueueService } from "./report-queue.service";
import { ReportsModule } from "./reports.module"; // <-- IMPORTANT

@Module({
  imports: [
    ReportsModule, // <-- THIS FIXES THE ERROR
  ],
  providers: [
    ReportQueueService,
  ],
  exports: [
    ReportQueueService,
  ],
})
export class ReportQueueModule {}
