import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PublicService } from "./public.service";

@Controller("public")
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get("tenders/:tenderNumber/award.pdf")
  async getTenderAwardPdf(
    @Param("tenderNumber") tenderNumber: string,
    @Res() res: Response,
  ) {
    const pdf = await this.publicService.generateTenderAwardPdf(tenderNumber);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="tender-${tenderNumber}-award.pdf"`,
    );
    res.send(pdf);
  }

  @Get("tenders")
  async searchPublicTenders(
    @Res() res: Response,
  ) {
    const data = await this.publicService.listPublishedTenders();
    res.json(data);
  }
}
