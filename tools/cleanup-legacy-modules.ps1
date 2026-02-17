Param(
  [string]$Root = "apps/backend"
)

Write-Host "Cleaning legacy modules under $Root/src/modules ..." -ForegroundColor Cyan

$paths = @(
  "src\modules\analytics\analytics.routes.ts",
  "src\modules\analytics\analytics.audit.ts",
  "src\modules\analytics\analytics.controller.ts",
  "src\modules\analytics\analytics.module.ts",
  "src\modules\analytics\analytics.service.ts",
  "src\modules\audit\analytics-report.routes.ts",
  "src\modules\evidence\evidence.controller.ts",
  "src\modules\evidence\evidence.service.ts",
  "src\modules\health\health.routes.ts"
)

foreach ($p in $paths) {
  $full = Join-Path $Root $p
  if (Test-Path $full) {
    Write-Host "Deleting $full" -ForegroundColor Yellow
    Remove-Item $full -Force
  } else {
    Write-Host "Skipping (not found): $full" -ForegroundColor DarkGray
  }
}

Write-Host "Legacy cleanup complete." -ForegroundColor Green
