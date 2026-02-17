async getProcessStats(user): Promise<AnalyticsProcessStatsResponse> {
  const where = getRoleFilter(user);

  const avgDaysPerStage = await prisma.$queryRaw<
    AnalyticsProcessStatsData["avgDaysPerStage"]
  >`
    SELECT
      wl.stage AS "stageId",
      wl.stage AS label,
      AVG(wl."daysSpent") AS "avgDays"
    FROM "WorkflowLog" wl
    JOIN "EvaluationResult" er ON er.id = wl."evaluationResultId"
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY wl.stage
    ORDER BY wl.stage ASC;
  `;

  const stuckEvaluations = await prisma.$queryRaw<
    AnalyticsProcessStatsData["stuckEvaluations"]
  >`
    SELECT
      er."currentStage" AS "stageId",
      COUNT(*) AS count
    FROM "EvaluationResult" er
    WHERE er."slaBreached" = true
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY er."currentStage";
  `;

  const slaBreaches = await prisma.evaluationResult.count({
    where: {
      ...where,
      slaBreached: true
    }
  });
