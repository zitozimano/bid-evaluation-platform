import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuditService } from "./audit.service";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly audit: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const entity = request.params?.entity || null;
    const entityId = request.params?.id || null;
    const action = request.method;

    const oldState = null;

    return next.handle().pipe(
      tap((response) => {
        const newState = null;

        this.audit.log({
          user: request.user?.id ?? "system",
          entity,
          entityId,
          action,
          oldState,
          newState,
          payload: request.body
        });
      })
    );
  }
}
