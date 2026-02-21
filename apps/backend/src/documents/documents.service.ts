import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { AuditService } from "../audit/audit.service";
import { createReadStream } from "fs";
import { join } from "path";

@Injectable()
export class DocumentsService {
  constructor(private readonly audit: AuditService) {}

  private documents: any[] = [];

  create(dto: CreateDocumentDto, file: Express.Multer.File) {
    const doc = {
      id: `${Date.now()}`,
      tenderId: dto.tenderId,
      type: dto.type,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      uploadedAt: new Date().toISOString()
    };

    this.documents.push(doc);

    this.audit.log({
      user: "system",
      entity: "tender",
      entityId: dto.tenderId,
      action: "upload_document",
      payload: {
        type: dto.type,
        filename: file.filename,
        originalName: file.originalname
      }
    });

    return doc;
  }

  findByTender(tenderId: string) {
    return this.documents.filter((d) => d.tenderId === tenderId);
  }

  getRequiredStatus(tenderId: string) {
    const docs = this.findByTender(tenderId);

    const hasTOR = docs.some((d) => d.type === "TOR");
    const hasSpec = docs.some((d) => d.type === "SPEC");

    return {
      hasTOR,
      hasSpec,
      allRequired: hasTOR && hasSpec
    };
  }

  findOne(id: string) {
    const doc = this.documents.find((d) => d.id === id);
    if (!doc) throw new NotFoundException("Document not found");
    return doc;
  }

  getFileStream(id: string) {
    const doc = this.findOne(id);
    const stream = createReadStream(join(process.cwd(), doc.path));
    return { doc, stream };
  }
}
