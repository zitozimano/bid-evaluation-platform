import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as jwt from "jsonwebtoken";

describe("/me endpoint", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    token = jwt.sign(
      {
        sub: "user-1",
        email: "scm@example.com",
        roles: ["SCM"],
        tenantId: "tenant-1",
      },
      process.env.JWT_SECRET || "test-secret",
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns current user", async () => {
    const res = await request(app.getHttpServer())
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toMatchObject({
      id: "user-1",
      email: "scm@example.com",
      roles: ["SCM"],
      tenantId: "tenant-1",
    });
  });

  it("rejects unauthenticated", async () => {
    await request(app.getHttpServer()).get("/me").expect(401);
  });
});
