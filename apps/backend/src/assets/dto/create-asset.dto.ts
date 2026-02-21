export class CreateAssetDto {
  tenderId?: string;
  name!: string;
  description?: string;
  assetNumber?: string;
  category?: string;
  location?: string;
  departmentId?: string;
  cost!: number;
  acquisitionDate!: Date;
  usefulLifeYears!: number;
  residualValue?: number;
}
