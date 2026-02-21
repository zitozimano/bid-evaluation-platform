import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RequestContextService } from "../common/tenant/request-context.service";
import { CacheService } from "../common/cache/cache.service";
import { DomainEventsService } from "../common/events/domain-events.service";
import { CreateAssetDto } from "./dto/create-asset.dto";
import { Asset, AssetLifecycleEventType } from "@prisma/client";

@Injectable()
export class AssetsService {
  private readonly cacheTtlMs = 60_000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly cache: CacheService,
    private readonly events: DomainEventsService,
  ) {}

  private get tenantId(): string | null {
    return this.context.tenantId;
  }

  async create(dto: CreateAssetDto): Promise<Asset> {
    const asset = await this.prisma.asset.create({
      data: {
        tenderId: dto.tenderId ?? null,
        name: dto.name,
        description: dto.description ?? null,
        assetNumber: dto.assetNumber ?? null,
        category: dto.category ?? null,
        location: dto.location ?? null,
        departmentId: dto.departmentId ?? null,
        cost: dto.cost,
        acquisitionDate: dto.acquisitionDate,
        usefulLifeYears: dto.usefulLifeYears,
        residualValue: dto.residualValue ?? 0,
      },
    });

    await this.prisma.assetLifecycleEvent.create({
      data: {
        assetId: asset.id,
        type: AssetLifecycleEventType.CREATED,
        note: "Asset created",
      },
    });

    await this.events.emit("asset.created", { assetId: asset.id });

    // Invalidate public caches that might depend on tender/asset
    this.cache.deleteByPrefix("tenderSummary:");
    this.cache.deleteByPrefix("publishedTenders:");

    return asset;
  }

  async findOne(id: string): Promise<Asset> {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException("Asset not found");
    }

    return asset;
  }

  async listByTender(tenderId: string): Promise<Asset[]> {
    return this.prisma.asset.findMany({
      where: { tenderId },
      orderBy: { acquisitionDate: "asc" },
    });
  }
}
