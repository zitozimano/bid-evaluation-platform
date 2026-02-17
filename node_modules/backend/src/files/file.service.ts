import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private uploadDir = path.join(process.cwd(), 'uploads');

  async uploadBuffer(buffer: Buffer, fileName: string): Promise<string> {
    await fs.mkdir(this.uploadDir, { recursive: true });

    const filePath = path.join(this.uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  }
}
