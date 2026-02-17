import http from "http";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:4000";

const routes = [
  { name: "Analytics overview", path: "/analytics/overview" },
  { name: "Analytics bidders", path: "/analytics/bidders" },
  { name: "Analytics process", path: "/analytics/process" },
  { name: "Analytics compliance", path: "/analytics/compliance" },
  { name: "Analytics risk", path: "/analytics/risk" },

  { name: "Audit access logs", path: "/audit/analytics-access" },
  { name: "Audit users", path: "/audit/analytics-access/users" },
  { name: "Audit tenders", path: "/audit/analytics-access/tenders" }
];

function checkRoute(route) {
  return new Promise((resolve) => {
    const url = new URL(route.path, BASE_URL);

    const req = http.get(url, (res) => {
      const ok = res.statusCode && res.statusCode < 500;
      resolve({ route, ok, status: res.statusCode });
    });

    req.on("error", (err) => {
      resolve({ route, ok: false, error: err.message });
    });
  });
}

(async () => {
  console.log(`Running backend health check against ${BASE_URL}`);

  const results = await Promise.all(routes.map(checkRoute));

  let allOk = true;

  for (const r of results) {
    if (r.ok) {
      console.log(`✅ ${r.route.name} (${r.route.path}) -> ${r.status}`);
    } else {
      allOk = false;
      console.log(
        `❌ ${r.route.name} (${r.route.path}) -> ${r.status || r.error}`
      );
    }
  }

  process.exit(allOk ? 0 : 1);
})();
