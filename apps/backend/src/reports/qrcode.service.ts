import { Injectable } from "@nestjs/common";
import * as QRCode from "qrcode";

@Injectable()
export class QRCodeService {
  async generate(url: string): Promise<Buffer> {
    return QRCode.toBuffer(url, { width: 300 });
  }
}
