import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { canRoleMoveStage } from "../workflow.roles";

@Injectable()
export class WorkflowRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    const stage = request.body?.stage;
    if (!stage) {
      throw new ForbiddenException("Missing stage in request body");
    }

    const role = user.role;
    if (!canRoleMoveStage(role, stage)) {
      throw new ForbiddenException(
        `Role ${role} is not allowed to move workflow to stage ${stage}`,
      );
    }

    return true;
  }
}
