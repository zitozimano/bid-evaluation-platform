async getComplianceStats(user): Promise<AnalyticsComplianceStatsResponse> {
  const where = getRoleFilter(user);

  const overallComplianceRate = await prisma.complianceItem.aggregate({
    where: {
      evaluationResult: where
    },
    _avg: { compliant: true }
  });

  const mostBreachedRules = await prisma.$queryRaw<
    AnalyticsComplianceStatsData["mostBreachedRules"]
  >`
    SELECT
      rule.id AS "ruleId",
      rule.label,
      COUNT(*) AS "breachCount"
    FROM "ComplianceItem" item
    JOIN "ComplianceRule" rule ON rule.id = item."ruleId"
    JOIN "EvaluationResult" er ON er.id = item."evaluationResultId"
    WHERE item.compliant = false
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY rule.id
    ORDER BY "breachCount" DESC
    LIMIT 10;
  `;

  const complianceByCircular = await prisma.$queryRaw<
    AnalyticsComplianceStatsData["complianceByCircular"]
  >`
    SELECT
      c.id AS "circularId",
      c.label,
      AVG(item.compliant::int) * 100 AS "complianceRate"
    FROM "Circular" c
    JOIN "ComplianceRule" rule ON rule."circularId" = c.id
    JOIN "ComplianceItem" item ON item."ruleId" = rule.id
    JOIN "EvaluationResult" er ON er.id = item."evaluationResultId"
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY c.id;
  `;
