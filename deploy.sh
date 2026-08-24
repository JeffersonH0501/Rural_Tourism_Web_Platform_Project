#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

usage() {
  cat <<'EOF'
Usage: ./deploy.sh

Builds and starts the production-like Docker Compose stack.

The idempotent demo accounts and catalog data are loaded on every deployment.

Options:
  --help    Show this help message.
EOF
}

for argument in "$@"; do
  case "${argument}" in
    --seed) ;; # Kept as a backwards-compatible no-op.
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: ${argument}" >&2; usage >&2; exit 2 ;;
  esac
done

command -v docker >/dev/null 2>&1 || {
  echo "Docker is required but was not found." >&2
  exit 1
}

docker compose version >/dev/null 2>&1 || {
  echo "Docker Compose v2 is required." >&2
  exit 1
}

if [[ ! -f "${ENV_FILE}" ]]; then
  command -v openssl >/dev/null 2>&1 || {
    echo "OpenSSL is required to generate deployment secrets." >&2
    exit 1
  }

  umask 077
  {
    printf 'POSTGRES_PASSWORD=%s\n' "$(openssl rand -hex 24)"
    printf 'JWT_SECRET=%s\n' "$(openssl rand -hex 32)"
  } > "${ENV_FILE}"
  echo "Created .env with generated local secrets."
fi

cd "${ROOT_DIR}"
docker compose config --quiet

echo "Building and starting Ruralia..."
docker compose up --build --detach --remove-orphans

API_CONTAINER="$(docker compose ps --quiet api)"
if [[ -z "${API_CONTAINER}" ]]; then
  echo "The API container was not created." >&2
  docker compose logs api >&2
  exit 1
fi

echo "Waiting for the API to become healthy..."
for attempt in $(seq 1 30); do
  STATUS="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "${API_CONTAINER}")"
  if [[ "${STATUS}" == "healthy" ]]; then
    break
  fi
  if [[ "${STATUS}" == "unhealthy" || "${STATUS}" == "exited" || "${STATUS}" == "dead" ]]; then
    echo "The API entered the ${STATUS} state." >&2
    docker compose logs api >&2
    exit 1
  fi
  if [[ "${attempt}" == "30" ]]; then
    echo "Timed out while waiting for the API health check." >&2
    docker compose logs api >&2
    exit 1
  fi
  sleep 2
done

echo "Loading idempotent demo accounts and catalog data..."
docker compose exec --no-TTY api node dist/database/seed.js

echo
echo "Deployment is healthy."
echo "Application: http://localhost:8080"
echo "API docs:    http://localhost:8080/api/docs"
echo "Health:      http://localhost:8080/api/health"
