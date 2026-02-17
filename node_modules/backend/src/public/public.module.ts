import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";
import { PrismaService } from "../prisma/prisma.service";
import { HtmlPdfService } from "../common/pdf/html-pdf.service";

@Module({
  controllers: [PublicController],
  providers: [PublicService, PrismaService, HtmlPdfService],
})
export class PublicModule {}
