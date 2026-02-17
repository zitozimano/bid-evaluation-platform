import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async logEvent(
    userId: string | null,
    action: string,
    context: Record<string, any> = {},
  ) {
    return {
      userId,
      action,
      context,
      message: 'Audit log persistence not yet implemented',
    };
  }

  async listLogs(limit = 100) {
    return {
      logs: [],
      limit,
      message: 'Audit log listing not yet implemented',
    };
  }

  async detectAnomalies() {
    return {
      anomalies: [],
      message: 'Anomaly detection not yet implemented',
    };
  }
}
