async getOverview(user): Promise<AnalyticsOverviewResponse> {
  const where = getRoleFilter(user);

  const totalEvaluations = await prisma.evaluationResult.count({ where });

  const avgTurnaroundDays = await prisma.evaluationResult.aggregate({
    where,
    _avg: { functionalityScore: true } // replace with turnaroundDays if you add it
  });

  const complianceRateAgg = await prisma.complianceItem.aggregate({
    where: {
      evaluationResult: where
    },
    _avg: { compliant: true }
  });

  const exceptionsCount = await prisma.evaluationException.count({
    where: {
      evaluationResult: where
    }
  });

  const evaluationsPerMonth = await prisma.$queryRaw<
    AnalyticsOverviewData["evaluationsPerMonth"]
  >`
    SELECT
      to_char(er."createdAt", 'YYYY-MM') AS month,
      COUNT(*) AS count
    FROM "EvaluationResult" er
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY month
    ORDER BY month ASC;
  `;

  const workflowStages = await prisma.$queryRaw<
    AnalyticsOverviewData["workflowStages"]
  >`
    SELECT
      wl.stage AS id,
      wl.stage AS label,
      AVG(wl."daysSpent") AS "avgDays"
    FROM "WorkflowLog" wl
    JOIN "EvaluationResult" er ON er.id = wl."evaluationResultId"
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY wl.stage
    ORDER BY wl.stage ASC;
  `;
