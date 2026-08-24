# Ruralia

Ruralia is a bilingual marketplace for Colombian rural tourism. It connects visitors with farmers and artisans offering agricultural products, crafts, rural stays, guided tours, and promotions.

For installation and production-like Docker instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Product capabilities

- Public catalogs for products, crafts, stays, tours, and promotions
- English and Spanish user interface
- Visitor, farmer, artisan, and administrator roles
- Secure registration and cookie-based authentication
- Owner-restricted catalog management
- Responsive layouts for desktop, tablet, and mobile
- Idempotent demonstration data for development and evaluation

## Architecture

```text
Browser
   |
   | HTTP :8080
   v
Nginx / React SPA
   |
   | /api reverse proxy
   v
NestJS API
   |
   | TypeORM
   v
PostgreSQL 16
```

The React application and API share one browser origin through Nginx. Nginx serves the compiled single-page application, handles React Router fallback, and proxies `/api` requests to NestJS. The API owns authentication, authorization, validation, business rules, and persistence.

## Technology

| Layer | Technologies |
| --- | --- |
| Web | React 18, React Router, i18next |
| Web server | Nginx |
| API | NestJS, Passport, class-validator |
| Persistence | PostgreSQL 16, TypeORM migrations |
| Authentication | JWT stored in an HTTP-only cookie |
| Containers | Docker, Docker Compose |
| Testing | Jest, React Testing Library, Cypress |

## Repository structure

```text
.
├── backend/
│   └── src/
│       ├── auth/       Authentication and authorization
│       ├── catalog/    Products, crafts, farms, tours, promotions
│       ├── config/     Typed runtime environment
│       ├── database/   Data source, migrations, and seed
│       ├── health/     Container health endpoint
│       └── users/      Users, roles, and registration
├── frontend/
│   ├── public/locales/ English and Spanish translations
│   └── src/
│       ├── api/        Central API client
│       ├── auth/       Session and authentication screens
│       ├── catalog/    Catalog browsing and management
│       ├── dashboard/  Authenticated dashboard
│       └── layout/     Shared navigation
├── compose.yaml
├── deploy.sh
└── DEPLOYMENT.md
```

## API design

All endpoints use the `/api` prefix and English resource names:

- `/api/auth`
- `/api/users`
- `/api/agricultural-products`
- `/api/crafts`
- `/api/farms`
- `/api/tours`
- `/api/promotions`
- `/api/health`

Swagger documentation is available at `/api/docs` while the application is running.

Anonymous users can read public catalogs. Farmers and artisans can create and modify only the supported resources they own. Administrators can manage all resources. Ownership is derived from the authenticated session rather than accepted from browser input.

## Security model

- Passwords are hashed with bcrypt and never serialized.
- Authentication tokens are stored in an `HttpOnly`, `SameSite=Lax` cookie.
- Secure cookies can be enabled for HTTPS deployments.
- Registration rejects administrator roles, unknown roles, and unknown properties.
- DTO validation covers identifiers, strings, numbers, dates, URLs, and role values.
- CORS is restricted to the configured web origin.
- Database schema synchronization is disabled in favor of migrations.

## Localization

Repository internals, database identifiers, API contracts, and canonical data are English. The visible interface supports English and Spanish through:

- `frontend/public/locales/en/common.json`
- `frontend/public/locales/es/common.json`

Translation keys are semantic English identifiers and should be added to both locale files.

## Local development

Use Node.js 20 and a running PostgreSQL database.

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
