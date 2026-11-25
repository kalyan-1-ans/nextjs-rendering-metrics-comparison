# Payload CMS

Independent Payload CMS with PostgreSQL, a Next.js admin interface at `/admin`,
and a REST API at `/api`. `/` redirects to `/admin`. Only the `users` collection
is configured; all CMS users are trusted administrators. Small Bites content
models and consumer applications are deferred.

## Requirements

- Node.js 24.22.3 or a newer Node 24 patch release.
- pnpm 10.34.5, as pinned by the root workspace.
- A running PostgreSQL server and an empty database owned by the connecting role.

If you use nvm, run `nvm install` and `nvm use` from the repository root.

## Local PostgreSQL with Docker

The local database uses PostgreSQL 17 in Docker. Set `POSTGRES_PASSWORD` in `.env`
to a random password and use the same password in `DATABASE_URL`, with role `cms`,
host `127.0.0.1`, port `55432` and database `rendering_metrics_cms`. If initialization
created the Docker database, these credentials are already configured locally.

With Docker running, use these commands from the repository root:

```sh
pnpm cms:db:start
pnpm cms:db:stop
```

The container is named `rendering-metrics-cms-db`. Data persists in the Docker
volume `rendering-metrics-cms-postgres` when the container is stopped or recreated.
Port `55432` is bound only to localhost to avoid existing services on `5432` and `5433`.
`POSTGRES_PASSWORD` initializes a new volume;
changing the environment file does not change an existing database password.

To register this server in pgAdmin, right-click **Servers → Register → Server**:

| Setting | Value |
| --- | --- |
| Name | Rendering Metrics CMS |
| Host name/address | `127.0.0.1` |
| Port | `55432` |
| Maintenance database | `rendering_metrics_cms` |
| Username | `cms` |
| Password | The `POSTGRES_PASSWORD` value in `apps/cms/.env` |

## Using another PostgreSQL server

pgAdmin manages PostgreSQL servers; installing pgAdmin does not install a database
server. Connect to an existing local or hosted PostgreSQL server first.

In pgAdmin:

1. Connect to the server under **Servers**.
2. Right-click **Databases → Create → Database**.
3. Name it `rendering_metrics_cms` and choose your PostgreSQL login role as owner.
4. Save. Leave the database empty; Payload manages its tables.

Record the host, port, role and password for the connection string. A local server
typically uses `127.0.0.1:5432`. If no server is registered or reachable, set up a
PostgreSQL server before continuing, or use the Docker option above.

## Environment

From the repository root, copy the example if `.env` does not already exist:

```sh
cp -n apps/cms/.env.example apps/cms/.env
```

Set these values in `apps/cms/.env`:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | `postgresql://ROLE:PASSWORD@HOST:PORT/rendering_metrics_cms` |
| `POSTGRES_PASSWORD` | Local Docker password; must match `DATABASE_URL` (not needed for a hosted database) |
| `PAYLOAD_SECRET` | A stable random secret, generated with `openssl rand -hex 32` |
| `CMS_URL` | `http://localhost:3000` locally; the public HTTPS origin in production |

URL-encode special characters in database usernames and passwords. Keep `.env`
and production secrets out of Git. If initialization already created the local
Docker database and `.env`, its credentials and Payload secret are ready.

## Development

Run from the repository root:

```sh
pnpm install
pnpm cms:db:start
pnpm dev:cms
```

Skip `cms:db:start` when using another PostgreSQL server.
For a newly created empty database, you can apply the initial migration with
`pnpm cms:migrate` before the first development startup.

Payload synchronizes the development schema automatically. Open
<http://localhost:3000/admin> and create the first administrator using your own
email and password. Payload's first-user flow handles this bootstrap; subsequent
user creation, reading, editing, deletion and unlocking require authentication.
No administrator credentials or content are seeded.

The Users API is private. No content endpoints are configured yet. The REST API
is enabled; GraphQL is disabled. There is no cross-origin browser allowlist yet.
Future Next.js consumers can use server-side HTTP requests; browser requests can
be allowed for specific origins when those apps exist.

After changing collection configuration, regenerate committed artifacts:

```sh
pnpm cms:generate:types
pnpm cms:generate:importmap
```

## Database migrations and production

Use a separate production database. Development schema synchronization does not
replace production migrations. Schema migrations live in `src/migrations`.

For later schema changes, generate a migration and review the resulting files:

```sh
pnpm cms:migrate:create describe_schema_change
```

The initial Users and internal Payload schema migration is already included.
Commit later generated migrations, snapshots and `src/migrations/index.ts` together.
On the deployment platform, set the environment variables, build the CMS, apply
migrations once as a release step, then start the app:

```sh
pnpm build:cms
pnpm cms:migrate
pnpm start:cms
```

With Vercel or Netlify, their Next.js runtime handles starting the built app;
arrange migrations as a separate controlled release step. Deployment platform
configuration is deferred. Claim the first administrator before sharing a new
deployment. An email provider for password resets is also deferred.

## Verification

```sh
pnpm lint
pnpm typecheck:cms
pnpm build:cms
```

A real database connection is required to verify admin login and API access.
This demo does not include or run unit or end-to-end tests.
