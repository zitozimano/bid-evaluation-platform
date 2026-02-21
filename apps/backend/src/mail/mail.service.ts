import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendMail(to: string, subject: string, html: string) {
    // TODO: plug in real transport (SMTP, SendGrid, etc.)
    this.logger.log(`Sending mail to ${to}: ${subject}`);
    this.logger.debug(html);
  }
}
