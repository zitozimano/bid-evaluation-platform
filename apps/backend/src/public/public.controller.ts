import {
  Controller,
  Get,
  Param,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { PublicService } from "./public.service";
import {
  CouncilPackDto,
  PublishedTenderListDto,
  TenderSummaryDto,
  VerifyHashDto,
  VerifyRunDto,
} from "./dto/public.dto";

@Controller("public")
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get("tenders/:tenderId/summary")
  async getTenderSummary(
    @Param("tenderId") tenderId: string,
  ): Promise<TenderSummaryDto | null> {
    return this.service.getTenderSummary(tenderId);
  }

  @Get("tenders/:tenderId/council-pack/latest")
  async getLatestCouncilPack(
    @Param("tenderId") tenderId: string,
  ): Promise<CouncilPackDto | null> {
    return this.service.getLatestCouncilPack(tenderId);
  }

  @Get("tenders/published")
  async listPublishedTenders(
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
    @Query("departmentId") departmentId?: string,
    @Query("categoryId") categoryId?: string,
    @Query("year") year?: string,
  ): Promise<PublishedTenderListDto> {
    return this.service.listPublishedTenders({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
      departmentId,
      categoryId,
      year: year ? Number(year) : undefined,
    });
  }

  @Get("tenders/:tenderNumber/award/pdf")
  async generateAwardPdf(
    @Param("tenderNumber") tenderNumber: string,
    @Res() res: Response,
  ) {
    const buffer = await this.service.generateTenderAwardPdf(tenderNumber);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="award-${tenderNumber}.pdf"`,
    );

    return res.send(buffer);
  }

  @Get("verify/hash/:tenderId/:hash")
  async verifyHash(
    @Param("tenderId") tenderId: string,
    @Param("hash") hash: string,
  ): Promise<VerifyHashDto> {
    return this.service.verifyTenderHash(tenderId, hash);
  }

  @Get("verify/run/:tenderId/:runNumber")
  async verifyRun(
    @Param("tenderId") tenderId: string,
    @Param("runNumber") runNumber: string,
  ): Promise<VerifyRunDto> {
    return this.service.verifyRun(tenderId, Number(runNumber));
  }
}
