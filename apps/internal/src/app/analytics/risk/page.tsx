async getRiskStats(user): Promise<AnalyticsRiskStatsResponse> {
  const where = getRoleFilter(user);

  const riskDistribution = await prisma.$queryRaw<
    AnalyticsRiskStatsData["riskDistribution"]
  >`
    SELECT
      CASE
        WHEN er."riskScore" IS NULL THEN 'LOW'
        WHEN er."riskScore" < 35 THEN 'LOW'
        WHEN er."riskScore" < 70 THEN 'MEDIUM'
        ELSE 'HIGH'
      END AS level,
      COUNT(*) AS count
    FROM "EvaluationResult" er
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY level;
  `;

  const avgRiskByCategory = await prisma.$queryRaw<
    AnalyticsRiskStatsData["avgRiskByCategory"]
  >`
    SELECT
      t.category,
      AVG(er."riskScore") AS "avgRisk"
    FROM "EvaluationResult" er
    JOIN "Tender" t ON t.id = er."tenderId"
    WHERE t.category IS NOT NULL
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY t.category;
  `;

  const highestRiskBidders = await prisma.$queryRaw<
    AnalyticsRiskStatsData["highestRiskBidders"]
  >`
    SELECT
      b.id AS "bidderId",
      b.name,
      AVG(er."riskScore") AS "avgRisk"
    FROM "Bidder" b
    JOIN "EvaluationResult" er ON er."bidderId" = b.id
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY b.id
    ORDER BY "avgRisk" DESC
    LIMIT 10;
  `;
