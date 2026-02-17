import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

const ALLOWED_ROLES = ["SCM", "AUDIT", "CFO", "AO", "ADMIN"];

@Injectable()
export class WorkflowDownloadGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    if (!ALLOWED_ROLES.includes(user.role)) {
      throw new ForbiddenException(
        `Role ${user.role} is not allowed to download evaluation packs`,
      );
    }

    return true;
  }
}
