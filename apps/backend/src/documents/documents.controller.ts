import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Res
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { Response } from "express";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";

const uploadConfig = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024
  }
};

@Controller("documents")
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Roles(Role.PMU, Role.ADMIN)
  @Post("upload")
  @UseInterceptors(FileInterceptor("file", uploadConfig))
  upload(
    @UploadedFile() file: any,
    @Body() body: CreateDocumentDto
  ) {
    if (!file) {
      return { success: false, message: "Invalid file type or missing file" };
    }
    return this.service.create(body, file);
  }

  @Get("tender/:tenderId")
  findByTender(@Param("tenderId") tenderId: string) {
    return this.service.findByTender(tenderId);
  }

  @Get("required/:tenderId")
  required(@Param("tenderId") tenderId: string) {
    return this.service.getRequiredStatus(tenderId);
  }

  @Roles(Role.PMU, Role.SCM, Role.ADMIN, Role.IA)
  @Get(":id/download")
  async download(@Param("id") id: string, @Res() res: Response) {
    const { doc, stream } = this.service.getFileStream(id);

    res.setHeader("Content-Type", doc.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(doc.originalName)}"`
    );

    stream.pipe(res);
  }
}
