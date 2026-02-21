import { Request, Response, NextFunction } from "express";

// Keep this loose: we only need tenantId and id/role for now.
export type UserLike = {
  id?: string;
  tenantId?: string;
  role?: string;
  [key: string]: any;
};

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const userHeader = req.headers["x-user"];

  if (userHeader) {
    try {
      const parsed: UserLike = JSON.parse(userHeader as string);
      (req as any).user = parsed;
    } catch {
      // ignore malformed header
    }
  }

  next();
}
