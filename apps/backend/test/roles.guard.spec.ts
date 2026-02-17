import { Reflector } from "@nestjs/core";
import { ExecutionContext } from "@nestjs/common";
import { RolesGuard } from "../src/auth/roles.guard";

describe("RolesGuard", () => {
  it("allows when no roles metadata", () => {
    const reflector = new Reflector();
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);

    const guard = new RolesGuard(reflector as any);
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ["SCM"] } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it("denies when user lacks required role", () => {
    const reflector = new Reflector();
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["ADMIN"]);

    const guard = new RolesGuard(reflector as any);
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ["SCM"] } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(ctx)).toBe(false);
  });

  it("allows when user has required role", () => {
    const reflector = new Reflector();
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["SCM"]);

    const guard = new RolesGuard(reflector as any);
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ["SCM", "CFO"] } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(ctx)).toBe(true);
  });
});
