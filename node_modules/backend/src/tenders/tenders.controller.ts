import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TendersService } from "./tenders.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("tenders")
@UseGuards(RolesGuard)
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Get()
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async listTenders(
    @Query("search") search?: string,
    @Query("status") status?: string,
  ) {
    return this.tendersService.listTenders({ search, status });
  }

  @Get("dashboard")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getDashboard() {
    return this.tendersService.getDashboard();
  }

  @Get(":tenderId")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getTender(@Param("tenderId") tenderId: string) {
    const tender = await this.tendersService.getTender(tenderId);
    if (!tender) throw new NotFoundException("Tender not found");
    return tender;
  }

  @Get(":tenderId/details")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getTenderDetails(@Param("tenderId") tenderId: string) {
    const details = await this.tendersService.getTenderDetails(tenderId);
    if (!details) throw new NotFoundException("Tender not found");
    return details;
  }

  @Get(":tenderId/timeline")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getTimeline(@Param("tenderId") tenderId: string) {
    return this.tendersService.getTimeline(tenderId);
  }

  @Post()
  @Roles("SCM", "ADMIN")
  async createTender(
    @Body() body: { number: string; description: string },
  ) {
    return this.tendersService.createTender(body);
  }

  @Put(":tenderId")
  @Roles("SCM", "ADMIN")
  async updateTender(
    @Param("tenderId") tenderId: string,
    @Body() body: { number?: string; description?: string },
  ) {
    const updated = await this.tendersService.updateTender(
      tenderId,
      body,
    );
    if (!updated) throw new NotFoundException("Tender not found");
    return updated;
  }

  @Post(":tenderId/status/:newStatus")
  @Roles("SCM", "CFO", "ADMIN")
  async updateStatus(
    @Param("tenderId") tenderId: string,
    @Param("newStatus") newStatus: string,
  ) {
    const updated = await this.tendersService.updateTenderStatus(
      tenderId,
      newStatus,
    );

    if (!updated) {
      throw new NotFoundException("Tender not found");
    }

    return updated;
  }

  @Get(":tenderId/activity")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getActivity(@Param("tenderId") tenderId: string) {
    return this.tendersService.listActivity(tenderId);
  }

  @Post("import")
  @Roles("SCM", "ADMIN")
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    const csv = file.buffer.toString("utf-8");
    return this.tendersService.bulkImportFromCsv(csv);
  }
}
