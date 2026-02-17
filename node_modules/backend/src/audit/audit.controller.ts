import { Controller, Get, Query } from '@nestjs/common';
import { AuditLogService } from './audit-log/audit-log.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('audit')
export class AuditController {
  constructor(private auditLogService: AuditLogService) {}

  /**
   * View audit logs.
   * Restricted to governance roles.
   */
  @Get('logs')
  @Roles(Role.AUDIT, Role.CFO, Role.SCM, Role.AGSA, Role.ADMIN)
  getLogs(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    return this.auditLogService.listLogs(parsedLimit);
  }

  /**
   * Run anomaly detection.
   * Restricted to governance roles.
   */
  @Get('anomalies')
  @Roles(Role.AUDIT, Role.CFO, Role.SCM, Role.AGSA, Role.ADMIN)
  getAnomalies() {
    return this.auditLogService.detectAnomalies();
  }
}
