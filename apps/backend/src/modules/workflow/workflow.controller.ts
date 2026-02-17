import { Controller, Get, Param } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('tenders/:tenderId/workflow')
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}

  @Get()
  async getWorkflow(@Param('tenderId') tenderId: string) {
    return this.workflowService.getWorkflowTimeline(tenderId);
  }
}
