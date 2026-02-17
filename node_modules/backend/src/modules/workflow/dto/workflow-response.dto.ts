export class WorkflowLogDto {
  id: string;
  stage: string;
  daysSpent: number;
  createdAt: Date;
}

export class WorkflowTimelineResponseDto {
  tenderId: string;
  currentStage: string | null;
  logs: WorkflowLogDto[];
}
