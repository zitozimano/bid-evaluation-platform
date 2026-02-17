import { defineConfig } from "prisma";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL!,
    },
  },
});
