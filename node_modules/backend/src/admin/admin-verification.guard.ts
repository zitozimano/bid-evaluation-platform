import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

const ALLOWED_ROLES = ["AUDIT", "INTERNAL-AUDIT", "ADMIN"];

@Injectable()
export class AdminVerificationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    if (!ALLOWED_ROLES.includes(user.role)) {
      throw new ForbiddenException(
        `Role ${user.role} is not allowed to access verification logs`,
      );
    }

    return true;
  }
}
