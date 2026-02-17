import { Router } from "express";
import { prisma } from "../../prisma";
import { requireAuth, requireRoles } from "../../middleware/auth";

const router = Router();

router.use(requireAuth, requireRoles("ADMIN"));

router.get("/", async (req, res) => {
  const [assignments, users, tenders] = await Promise.all([
    prisma.scmTenderAssignment.findMany({
      include: {
        user: true,
        tender: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.findMany({
      where: { role: "SCM" },
      orderBy: { name: "asc" }
    }),
    prisma.tender.findMany({
      orderBy: { createdAt: "desc" }
    })
  ]);

  res.json({
    success: true,
    data: {
      assignments: assignments.map((a) => ({
        id: a.id,
        userId: a.userId,
        tenderId: a.tenderId,
        createdAt: a.createdAt.toISOString(),
        user: {
          id: a.user.id,
          name: a.user.name,
          email: a.user.email
        },
        tender: {
          id: a.tender.id,
          number: a.tender.number,
          description: a.tender.description
        }
      })),
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email
      })),
      tenders: tenders.map((t) => ({
        id: t.id,
        number: t.number,
        description: t.description
      }))
    }
  });
});

router.post("/", async (req, res) => {
  const { userId, tenderId } = req.body as {
    userId: string;
    tenderId: string;
  };

  const created = await prisma.scmTenderAssignment.create({
    data: { userId, tenderId },
    include: { user: true, tender: true }
  });

  res.json({
    success: true,
    data: {
      id: created.id,
      userId: created.userId,
      tenderId: created.tenderId,
      createdAt: created.createdAt.toISOString(),
      user: {
        id: created.user.id,
        name: created.user.name,
        email: created.user.email
      },
      tender: {
        id: created.tender.id,
        number: created.tender.number,
        description: created.tender.description
      }
    }
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.scmTenderAssignment.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
