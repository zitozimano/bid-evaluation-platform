import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { CreateAssetDto } from "./dto/create-asset.dto";
import { Asset } from "@prisma/client";

@Controller("assets")
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  @Post()
  async create(@Body() dto: CreateAssetDto): Promise<Asset> {
    return this.service.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Asset> {
    return this.service.findOne(id);
  }

  @Get("tender/:tenderId")
  async listByTender(
    @Param("tenderId") tenderId: string,
  ): Promise<Asset[]> {
    return this.service.listByTender(tenderId);
  }
}
