import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PermissionsMatrix } from './permissions.matrix';

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const permission = request.route.path + ':' + request.method;

    const allowedRoles = PermissionsMatrix[permission];

    if (!allowedRoles) return true;

    if (!allowedRoles.includes(user?.role)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
