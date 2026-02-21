import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as crypto from "crypto";

@Injectable()
export class SigningService {
  constructor(private prisma: PrismaService) {}

  async signHash(hash: string, tenderId: string, type: string) {
    const privateKey = process.env.REPORT_SIGNING_PRIVATE_KEY;
    if (!privateKey) throw new Error("REPORT_SIGNING_PRIVATE_KEY is not configured");

    const signer = crypto.createSign("RSA-SHA256");
    signer.update(hash);
    signer.end();

    const signature = signer.sign(privateKey, "base64");

    const prismaAny = this.prisma as any;

    return prismaAny.reportSignature.create({
      data: {
        hash,
        tenderId,
        type,
        userId: "system",
        signature,
        algorithm: "RSA-SHA256",
      },
    });
  }

  async verifyHashSignature(hash: string) {
    const publicKey = process.env.REPORT_SIGNING_PUBLIC_KEY;
    if (!publicKey) throw new Error("REPORT_SIGNING_PUBLIC_KEY is not configured");

    const prismaAny = this.prisma as any;

    const record = await prismaAny.reportSignature.findUnique({
      where: { hash },
    });

    if (!record) return { valid: false, record: null };

    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(hash);
    verifier.end();

    const valid = verifier.verify(publicKey, record.signature, "base64");

    return { valid, record };
  }
}
