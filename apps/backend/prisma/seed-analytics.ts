import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Create a circular + rules
  const circular = await prisma.circular.create({
    data: {
      label: "MFMA SCM Circular 01/2026",
      rules: {
        create: [
          { code: "R1", label: "Valid tax clearance" },
          { code: "R2", label: "CSD registration" },
          { code: "R3", label: "No conflict of interest" }
        ]
      }
    },
    include: { rules: true }
  });

  // 2) Take some existing EvaluationResults (or create a few)
  const results = await prisma.evaluationResult.findMany({
    take: 10
  });

  if (!results.length) {
    console.warn("No EvaluationResult rows found. Seed base data first.");
    return;
  }

  for (const [i, er] of results.entries()) {
    // Risk + SLA + stage
    await prisma.evaluationResult.update({
      where: { id: er.id },
      data: {
        riskScore: 20 + i * 5,
        complianceRate: 0.8 + (i % 3) * 0.05,
        exceptionsCount: i % 2,
        slaBreached: i % 4 === 0,
        currentStage: i % 3 === 0 ? "EVAL" : i % 3 === 1 ? "ADJUD" : "SPEC"
      }
    });

    // Workflow logs
    await prisma.workflowLog.createMany({
      data: [
        {
          evaluationResultId: er.id,
          stage: "SPEC",
          daysSpent: 3 + (i % 2)
        },
        {
          evaluationResultId: er.id,
          stage: "EVAL",
          daysSpent: 5 + (i % 3)
        },
        {
          evaluationResultId: er.id,
          stage: "ADJUD",
          daysSpent: 2 + (i % 2)
        }
      ]
    });

    // Compliance items
    for (const rule of circular.rules) {
      await prisma.complianceItem.create({
        data: {
          evaluationResultId: er.id,
          ruleId: rule.id,
          compliant: !(i % 4 === 0 && rule.code === "R2")
        }
      });
    }

    // Exceptions
    if (i % 3 === 0) {
      await prisma.evaluationException.create({
        data: {
          evaluationResultId: er.id,
          type: "SCM_EXCEPTION",
          reason: "Late submission accepted due to system downtime",
          approved: i % 2 === 0,
          approvedBy: i % 2 === 0 ? "CFO" : null,
          approvedAt: i % 2 === 0 ? new Date() : null
        }
      });
    }
  }

  console.log("Analytics seed data created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
