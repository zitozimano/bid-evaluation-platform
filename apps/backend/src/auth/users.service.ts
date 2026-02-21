import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { MailService } from "../mail/mail.service";
import { inviteUserEmail } from "../mail/templates/invite-user.template";
import { resetPasswordEmail } from "../mail/templates/reset-password.template";
import { Role } from "./roles.enum";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly mail: MailService
  ) {}

  async findByUsername(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(email: string, password: string, role: Role, tenantId?: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        role,
        tenantId,
        active: true
      }
    });

    await this.audit.log({
      user: "system",
      entity: "user",
      entityId: user.id,
      action: "create_user",
      payload: { email, role, tenantId }
    });

    return user;
  }

  async updateRole(id: string, role: Role) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException("User not found");

    const updated = await this.prisma.user.update({
      where: { id },
      data: { role }
    });

    await this.audit.log({
      user: "system",
      entity: "user",
      entityId: id,
      action: "update_role",
      payload: { role }
    });

    return updated;
  }

  async disable(id: string) {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { active: false }
    });

    await this.audit.log({
      user: "system",
      entity: "user",
      entityId: id,
      action: "disable_user"
    });

    return updated;
  }

  async enable(id: string) {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { active: true }
    });

    await this.audit.log({
      user: "system",
      entity: "user",
      entityId: id,
      action: "enable_user"
    });

    return updated;
  }

  // ---------------- INVITE USER ----------------

  async inviteUser(email: string, role: Role, tenantId?: string) {
    const token = randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const user = await this.prisma.user.create({
      data: {
        email,
        role,
        password: "",
        tenantId,
        active: true,
        inviteToken: token,
        tokenExpires: expires
      }
    });

    const link = `${process.env.FRONTEND_BASE_URL}/invite/${token}`;
    const tmpl = inviteUserEmail(link);
    await this.mail.sendMail(email, tmpl.subject, tmpl.html);

    await this.audit.log({
      user: "system",
      entity: "user",
      entityId: user.id,
      action: "invite_user",
      payload: { email, role, tenantId }
    });

    return { token, userId: user.id };
  }

  async acceptInvite(token: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { inviteToken: token }
    });
    if (!user) throw new NotFoundException("Invalid invite token");

    const passwordHash = await bcrypt.hash(password, 10);

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        inviteToken: null,
        tokenExpires: null
      }
    });

    await this.audit.log({
      user: user.id,
      entity: "user",
      entityId: user.id,
      action: "accept_invite"
    });

    return updated;
  }

  // ---------------- PASSWORD RESET ----------------

  async requestPasswordReset(email: string) {
    const user = await this.findByUsername(email);
    if (!user) throw new NotFoundException("User not found");

    const token = randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        tokenExpires: expires
      }
    });

    const link = `${process.env.FRONTEND_BASE_URL}/reset/${token}`;
    const tmpl = resetPasswordEmail(link);
    await this.mail.sendMail(email, tmpl.subject, tmpl.html);

    await this.audit.log({
      user: user.id,
      entity: "user",
      entityId: user.id,
      action: "request_password_reset"
    });

    return { token, userId: user.id };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { resetToken: token }
    });
    if (!user) throw new NotFoundException("Invalid reset token");

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        resetToken: null,
        tokenExpires: null
      }
    });

    await this.audit.log({
      user: user.id,
      entity: "user",
      entityId: user.id,
      action: "reset_password"
    });

    return updated;
  }
}
