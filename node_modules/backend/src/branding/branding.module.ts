import { Module } from "@nestjs/common";
import { BrandingService } from "./branding.service";
import { BrandingController } from "./branding.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [BrandingService],
  controllers: [BrandingController],
})
export class BrandingModule {}
