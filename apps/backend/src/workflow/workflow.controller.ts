import { WorkflowDownloadGuard } from "./guards/workflow-download.guard";

@Get("tenders/:tenderId/council-pack.pdf")
@UseGuards(WorkflowDownloadGuard)
async councilPackPdf(
  @Param("tenderId") tenderId: string,
  @Res() res: Response,
) {
  const pdfBuffer = await this.workflowService.generateCouncilPackPdf(
    tenderId,
  );
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="council-pack-${tenderId}.pdf"`,
  );
  res.send(pdfBuffer);
}

@Get("tenders/:tenderId/evaluation-pack.zip")
@UseGuards(WorkflowDownloadGuard)
async evaluationPackZip(
  @Param("tenderId") tenderId: string,
  @Res() res: Response,
) {
  const zipStream =
    await this.workflowService.generateEvaluationPackZip(tenderId);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="evaluation-pack-${tenderId}.zip"`,
  );
  zipStream.pipe(res);
}
