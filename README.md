# Rural Tourism Web Platform

A bilingual marketplace for Colombian rural tourism. Visitors discover agricultural products, crafts, rural stays, tours, and promotions. Farmers and artisans securely manage their own listings.

## Architecture

- **Web:** React 18, React Router, i18next, and Nginx
- **API:** NestJS, Passport JWT, validation, Swagger, and TypeORM
- **Database:** PostgreSQL 16 with versioned migrations
- **Authentication:** signed JWT in an HTTP-only cookie

Nginx serves the single-page application and proxies same-origin `/api` traffic to NestJS.

## Run with Docker

Docker Engine with Docker Compose v2 is required.

Deploy with one command. The script creates `.env` with cryptographically random local secrets when the file does not exist, builds the images, starts the services, waits for the API health check, and loads the idempotent demo dataset.

```bash
bash deploy.sh
```

The equivalent manual commands are:

```bash
cp .env.example .env
docker compose up --build --detach
```

Open <http://localhost:8080>. API documentation is at <http://localhost:8080/api/docs> and health status at <http://localhost:8080/api/health>.

Change both secrets in `.env` before sharing or exposing the deployment. PostgreSQL data persists in the `postgres_data` volume. Migrations and the idempotent demo seed run automatically.

```bash
docker compose down
docker compose down --volumes # also removes local database data
```

## Demo data

Every deployment ensures that demo accounts and one example item for each catalog are available without duplicating existing rows.

All demo accounts use password `DemoPass123!`.

| Role | Email |
| --- | --- |
| Farmer | `farmer@example.com` |
| Artisan | `artisan@example.com` |
| Visitor | `visitor@example.com` |

## Local development

Use Node.js 20 and PostgreSQL.

```bash
npm run install:all
cp backend/.env.example backend/.env
npm run migration:run --prefix backend
npm run backend
npm run frontend
```

Backend data commands:

```bash
npm run migration:run --prefix backend
npm run migration:revert --prefix backend
npm run seed --prefix backend
```

## Quality checks

```bash
npm run test:backend -- --runInBand
npm run test:frontend -- --watchAll=false
npm run build
npm run lint --prefix backend
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection URL |
| `JWT_SECRET` | Session signing secret; required in production |
| `JWT_EXPIRES_IN` | Session lifetime, default `2h` |
| `WEB_ORIGIN` | Allowed development browser origin |
| `COOKIE_SECURE` | Use `true` behind HTTPS |
| `PORT` | API port, default `4000` |

## Localization and security

Repository code and API contracts are English. UI translations live under `frontend/public/locales/en` and `frontend/public/locales/es`; new keys must be added to both.

Catalog reads are public. Registration permits visitor, farmer, or artisan roles. Producers can mutate only resources they own; administrators can manage all resources. Password hashes are never returned by the API.

## Troubleshooting

- Check health with `docker compose ps`.
- Inspect failures with `docker compose logs api`.
- For deployment, use HTTPS and set `COOKIE_SECURE=true`.
