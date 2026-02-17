import { Controller, Get, Param } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('compliance')
export class ComplianceController {
  constructor(private complianceService: ComplianceService) {}

  @Get('departments/risk-heatmap')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA)
  getRiskHeatmap() {
    return this.complianceService.getRiskHeatmap();
  }

  @Get('departments/:department/trend')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA)
  getDeptTrend(@Param('department') department: string) {
    return this.complianceService.getDepartmentTrend(department);
  }

  @Get('departments/:department/narrative')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA)
  getDeptNarrative(@Param('department') department: string) {
    return this.complianceService.getDepartmentNarrative(department);
  }

  @Get('departments/:department/forecast')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA)
  getDeptForecast(@Param('department') department: string) {
    return this.complianceService.getDepartmentForecast(department);
  }

  @Get('departments/:department/kpis')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA)
  getDeptKpis(@Param('department') department: string) {
    return this.complianceService.getDepartmentKpis(department);
  }
}
