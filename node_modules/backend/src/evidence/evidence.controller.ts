import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { EvidenceService } from "./evidence.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Role } from "../auth/roles.enum";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { AddEvidenceDto } from "../dto/evidence/add-evidence.dto";
import { EvidenceSummaryDto } from "../dto/evidence/evidence-summary.dto";
import { BidderEvidenceSummaryDto } from "../dto/evidence/bidder-evidence-summary.dto";

@ApiTags("Evidence")
@ApiBearerAuth()
@Controller("evidence")
@UseGuards(RolesGuard)
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get("tender/:tenderId")
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA, Role.ADMIN)
  @ApiOperation({ summary: "Get tender evidence summary" })
  @ApiResponse({ status: 200, type: EvidenceSummaryDto })
  async getTenderEvidenceSummary(@Param("tenderId") tenderId: string) {
    return this.evidenceService.getTenderEvidenceSummary(tenderId);
  }

  @Get("bidder/:bidderId")
  @Roles(Role.SCM, Role.CFO, Role.AUDIT, Role.AGSA, Role.ADMIN)
  @ApiOperation({ summary: "Get bidder evidence summary" })
  @ApiResponse({ status: 200, type: BidderEvidenceSummaryDto })
  async getBidderEvidenceSummary(@Param("bidderId") bidderId: string) {
    return this.evidenceService.getBidderEvidenceSummary(bidderId);
  }

  @Get("bidder/:bidderId/list")
  @Roles(Role.SCM, Role.ADMIN)
  @ApiOperation({ summary: "List evidence for a bidder" })
  @ApiResponse({ status: 200, type: [Object] })
  async getEvidenceForBidder(@Param("bidderId") bidderId: string) {
    return this.evidenceService.getEvidenceForBidder(bidderId);
  }

  @Post("bidder/:bidderId")
  @Roles(Role.SCM, Role.ADMIN)
  @ApiOperation({ summary: "Add evidence for a bidder" })
  @ApiBody({ type: AddEvidenceDto })
  @ApiResponse({ status: 201 })
  async addEvidence(
    @Param("bidderId") bidderId: string,
    @Body() body: AddEvidenceDto
  ) {
    return this.evidenceService.addEvidence(
      bidderId,
      body.type,
      body.url,
      body.metadata
    );
  }

  @Delete(":id")
  @Roles(Role.SCM, Role.ADMIN)
  @ApiOperation({ summary: "Delete evidence" })
  @ApiResponse({ status: 200 })
  async deleteEvidence(@Param("id") id: string) {
    return this.evidenceService.deleteEvidence(id);
  }
}
