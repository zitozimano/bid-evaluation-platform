import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Tenant
  const tenant = await prisma.tenant.upsert({
    where: { code: "MUNICIPALITY" },
    update: {},
    create: {
      code: "MUNICIPALITY",
      name: "Default Municipality",
      active: true,
    },
  });

  // 2. Users
  const users = [
    {
      email: "admin@example.com",
      name: "System Admin",
      role: "ADMIN",
      password: "hashed-password",
      tenantId: tenant.id,
    },
    {
      email: "scm@example.com",
      name: "SCM Officer",
      role: "SCM",
      password: "hashed-password",
      tenantId: tenant.id,
    },
    {
      email: "cfo@example.com",
      name: "Chief Financial Officer",
      role: "CFO",
      password: "hashed-password",
      tenantId: tenant.id,
    },
    {
      email: "audit@example.com",
      name: "Internal Auditor",
      role: "AUDIT",
      password: "hashed-password",
      tenantId: tenant.id,
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }

  // 3. Notification Rules
  const triggers = [
    "TENDER_STATUS_CHANGED",
    "TENDER_PUBLISHED",
    "TENDER_AWARDED",
  ];

  const roles = ["SCM", "CFO", "ADMIN", "AUDIT"];

  for (const trigger of triggers) {
    for (const role of roles) {
      await prisma.notificationRule.upsert({
        where: {
          trigger_role: {
            trigger,
            role,
          },
        },
        update: {},
        create: {
          trigger,
          role,
          enabled: true,
        },
      });
    }
  }

  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
