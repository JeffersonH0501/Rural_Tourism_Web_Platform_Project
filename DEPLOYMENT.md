# Ruralia Deployment Guide

This guide covers the production-like local Docker deployment. The stack contains the React/Nginx web service, NestJS API, and PostgreSQL database.

## Prerequisites

- Docker Engine
- Docker Compose v2
- Bash
- OpenSSL, only when `.env` does not exist

Confirm Docker is available:

```bash
docker --version
docker compose version
```

## Quick deployment

From the repository root:

```bash
bash deploy.sh
```

The deployment script:

1. Generates strong local secrets in `.env` when needed.
2. validates the Compose configuration.
3. Builds the API and web production images.
4. Starts PostgreSQL, the API, and Nginx in dependency order.
5. Runs database migrations before the API starts.
6. Waits until the API becomes healthy.
7. Runs the idempotent demonstration seed.

Open the following endpoints after deployment:

| Service | URL |
| --- | --- |
| Application | <http://localhost:8080> |
| API documentation | <http://localhost:8080/api/docs> |
| Health check | <http://localhost:8080/api/health> |

## Demonstration data

Every deployment ensures one example record exists for every catalog. Repeated deployments do not duplicate these records.

All demonstration accounts use password `DemoPass123!`.

| Role | Email |
| --- | --- |
| Farmer | `farmer@example.com` |
| Artisan | `artisan@example.com` |
| Visitor | `visitor@example.com` |

## Environment variables

The deployment script creates `.env` from generated secrets if the file is missing. Use `.env.example` as the documented template.

| Variable | Purpose |
| --- | --- |
| `POSTGRES_PASSWORD` | Password for the PostgreSQL application user |
| `JWT_SECRET` | Secret used to sign authenticated sessions |
| `DATABASE_URL` | Complete PostgreSQL connection URL used by the API |
| `JWT_EXPIRES_IN` | Session lifetime; defaults to `2h` |
| `WEB_ORIGIN` | Browser origin allowed by CORS |
| `COOKIE_SECURE` | Set to `true` when serving over HTTPS |
| `PORT` | Internal API port; defaults to `4000` |

Never commit `.env`. Replace local values before exposing the deployment publicly.

## Manual Docker commands

To start without the helper script:

```bash
cp .env.example .env
docker compose up --build --detach
docker compose exec --no-TTY api node dist/database/seed.js
```

View container state:

```bash
docker compose ps
```

Follow logs:

```bash
docker compose logs --follow
```

Stop the application while preserving PostgreSQL data:

```bash
docker compose down
```

Remove containers and the persistent database volume:

```bash
docker compose down --volumes
```

The final command permanently removes containerized database data.

## Database migrations

Migrations run automatically before the API process starts. For manual administration:

```bash
docker compose exec api npm run migration:run
docker compose exec api npm run migration:revert
```

PostgreSQL data is stored in the named `postgres_data` volume and survives ordinary container restarts and redeployments.

## Production considerations

Before deploying outside a local environment:

- Terminate TLS with a trusted HTTPS certificate.
- Set `COOKIE_SECURE=true`.
- Use strong externally managed database and JWT secrets.
- Restrict inbound database and API ports.
- Configure backups for the PostgreSQL volume.
- Send container logs to persistent monitoring.
- Pin and regularly update container image versions.
- Set the correct public web origin.

## Troubleshooting

Check all service health states:

```bash
docker compose ps
```

Inspect API startup or migration errors:

```bash
docker compose logs api
```

Inspect Nginx and proxy errors:

```bash
docker compose logs web
```

Inspect database startup errors:

```bash
docker compose logs db
```

If the browser shows an older interface after a successful rebuild, perform a hard refresh or clear the site cache. The application should make API requests through relative `/api` URLs, never directly to `localhost:4000`.

