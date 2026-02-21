import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // TODO: Replace with real authentication
    req.user = {
      id: "user-123",
      role: "PMU" // change this to test different roles
    };

    next();
  }
}
