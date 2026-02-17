# BidPlatform Backend – Deployment & Operational Runbook

## 1. Purpose

This document guides IT and Internal Audit to:

- Verify deployments
- Confirm health and readiness
- Validate analytics/audit endpoints
- Check monitoring and metrics
- Capture audit evidence

---

## 2. Key endpoints

- Health: `https://<host>/health`
- Liveness: `https://<host>/health/liveness`
- Readiness: `https://<host>/health/readiness`
- Version: `https://<host>/health/version`
- Metrics: `https://<host>/health/metrics`
- Analytics root: `https://<host>/analytics`
- Audit root: `https://<host>/audit`

---

## 3. Pre-deployment checks

1. **Configuration**
   - Confirm `DATABASE_URL` and `REDIS_URL` point to correct environment.
   - Confirm Helm values file used (dev/staging/production).

2. **Database**
   - Ensure DB is reachable from cluster.
   - Migrations applied via CI (`prisma migrate deploy`).

3. **Image**
   - Confirm image tag (commit or release) matches change request.

---

## 4. Post-deployment verification

### 4.1 Health

- Call: `GET /health`
- Expected:
  - `status: "ok"`
  - `db.ok: true`
  - `redis.ok: true`
  - `migrations.ok: true`
- If `status = "degraded"`:
  - Save JSON response
  - Log incident
  - Escalate to development

### 4.2 Version

- Call: `GET /health/version`
- Confirm:
  - `version` matches release
  - `gitCommit` matches deployment record
  - `buildTime` is recent

### 4.3 Readiness & liveness

- `GET /health/liveness` → `status: "alive"`
- `GET /health/readiness` → `status: "ready"`

If readiness fails:
- Check DB/Redis connectivity
- Check pod events (`kubectl describe pod`)

---

## 5. Functional checks

### 5.1 Analytics

Call:

1. `GET /analytics/overview`
2. `GET /analytics/bidders`
3. `GET /analytics/process`
4. `GET /analytics/compliance`
5. `GET /analytics/risk`

Expected:

- HTTP 200
- `success: true`
- `generatedAt` present
- `data` object present

### 5.2 Audit

Call:

1. `GET /audit/analytics-access`
2. `GET /audit/analytics-access/users`
3. `GET /audit/analytics-access/tenders`
4. `GET /audit/analytics-access/export`

Expected:

- HTTP 200
- For `/export`, CSV download.

---

## 6. Monitoring & metrics

### 6.1 Prometheus

- Confirm target `bidplatform-backend` is **UP**.
- Check metrics:
  - `bidplatform_uptime_seconds`
  - `bidplatform_cache_hits`
  - `bidplatform_cache_misses`

### 6.2 Grafana

- Open **“BidPlatform Analytics Performance”** dashboard.
- Verify:
  - Uptime panel shows non-zero value.
  - Cache hits/misses graph updates.
  - Hit ratio is reasonable (e.g. > 0.7 after warmup).

---

## 7. Incident handling

### 7.1 Symptoms & first checks

- **API unreachable**
  - Check Ingress, Service, pods.
  - Check `/health/liveness`.

- **Slow responses**
  - Check CPU/memory in Grafana.
  - Check HPA scaling.
  - Check DB performance.

- **Analytics data missing**
  - Confirm DB connectivity.
  - Confirm migrations.
  - Check backend logs for query errors.

---

## 8. Audit evidence

For each deployment, capture:

- `/health` response (JSON) after deployment.
- `/health/version` response.
- Screenshot of Grafana dashboard.
- Prometheus target status page.
- CI/CD logs for the deployment.
- Reference to change request / approval.

Store these in the agreed evidence repository (e.g. SharePoint, Git, or document management system).
