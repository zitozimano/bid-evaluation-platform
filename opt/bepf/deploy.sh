#!/usr/bin/env bash
set -euo pipefail

APP_NAME="bepf"
COMPOSE_FILE="/opt/bepf/docker-compose.prod.yml"
LOG_FILE="/var/log/bepf/deploy.log"
ROLLBACK_TAG_FILE="/opt/bepf/.last_successful_tag"

mkdir -p "$(dirname "$LOG_FILE")"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

health_check() {
  local name="$1"
  local url="$2"
  local retries=10
  local delay=5

  log "Health check for $name at $url"

  for i in $(seq 1 $retries); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      log "$name is healthy"
      return 0
    fi
    log "$name not healthy yet (attempt $i/$retries)"
    sleep "$delay"
  done

  log "Health check FAILED for $name"
  return 1
}

rollback() {
  if [[ ! -f "$ROLLBACK_TAG_FILE" ]]; then
    log "No rollback tag file found. Cannot rollback."
    exit 1
  fi

  local tag
  tag=$(cat "$ROLLBACK_TAG_FILE")
  log "Rolling back to previous tag: $tag"

  TAG="$tag" docker compose -f "$COMPOSE_FILE" pull
  TAG="$tag" docker compose -f "$COMPOSE_FILE" up -d

  if health_check "backend (rollback)" "http://localhost:8080/health" && \
     health_check "frontend (rollback)" "http://localhost:3000/"; then
    log "Rollback successful to tag: $tag"
    exit 0
  else
    log "Rollback FAILED. Manual intervention required."
    exit 1
  fi
}

main() {
  log "=== DEPLOYMENT START ==="

  local new_tag
  new_tag="${TAG:-latest}"
  log "Using image tag: $new_tag"

  if docker compose -f "$COMPOSE_FILE" ps >/dev/null 2>&1; then
    log "Existing stack detected. Recording current tag for rollback."
    echo "${CURRENT_TAG:-$new_tag}" > "$ROLLBACK_TAG_FILE"
  fi

  log "Pulling images for tag: $new_tag"
  TAG="$new_tag" docker compose -f "$COMPOSE_FILE" pull

  log "Starting containers with tag: $new_tag"
  TAG="$new_tag" docker compose -f "$COMPOSE_FILE" up -d

  if ! health_check "backend" "http://localhost:8080/health"; then
    log "Backend failed health check. Initiating rollback."
    rollback
  fi

  if ! health_check "frontend" "http://localhost:3000/"; then
    log "Frontend failed health check. Initiating rollback."
    rollback
  fi

  log "Deployment successful with tag: $new_tag"
  echo "$new_tag" > "$ROLLBACK_TAG_FILE"
  log "=== DEPLOYMENT COMPLETE ==="
}

main "$@"
