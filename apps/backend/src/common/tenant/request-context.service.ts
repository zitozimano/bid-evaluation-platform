import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  get tenantId(): string | null {
    const value = (this.req as any).tenantId;
    return typeof value === "string" ? value : null;
  }
}
