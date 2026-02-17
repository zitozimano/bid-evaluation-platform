import { ApiClient } from "./http";

export interface DepartmentRiskHeatmap {
  department: string;
  riskLevel: string;
  score: number;
}

export class ComplianceApi {
  constructor(private client: ApiClient) {}

  getRiskHeatmap() {
    return this.client.get<DepartmentRiskHeatmap[]>(
      `/compliance/departments/risk-heatmap`
    );
  }

  getTrend(department: string) {
    return this.client.get<any>(
      `/compliance/departments/${department}/trend`
    );
  }

  getNarrative(department: string) {
    return this.client.get<any>(
      `/compliance/departments/${department}/narrative`
    );
  }

  getForecast(department: string) {
    return this.client.get<any>(
      `/compliance/departments/${department}/forecast`
    );
  }

  getKpis(department: string) {
    return this.client.get<any>(
      `/compliance/departments/${department}/kpis`
    );
  }
}
