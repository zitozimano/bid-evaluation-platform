async getBidderStats(user): Promise<AnalyticsBidderStatsResponse> {
  const where = getRoleFilter(user);

  const bidders = await prisma.$queryRaw<
    AnalyticsBidderStatsData["bidders"]
  >`
    SELECT
      b.id AS "bidderId",
      b.name,
      COUNT(er.*) AS "totalParticipated",
      SUM(CASE WHEN er.qualifies = true THEN 1 ELSE 0 END) AS "totalAwarded",
      AVG(er."totalScore") AS "avgScore",
      AVG(er."riskScore") AS "avgRisk",
      SUM(er."exceptionsCount") AS "exceptionsCount",
      AVG(er."complianceRate") * 100 AS "complianceRate"
    FROM "Bidder" b
    JOIN "EvaluationResult" er ON er."bidderId" = b.id
    WHERE 1=1
    ${where.tenderId ? prisma.raw(`AND er."tenderId" IN (${where.tenderId.join(",")})`) : prisma.raw("")}
    GROUP BY b.id
    ORDER BY "avgRisk" DESC;
  `;
