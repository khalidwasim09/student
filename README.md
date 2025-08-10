# CampusConnect (MVP)

Student-only matching for Canadian institutions. Next.js 14, TypeScript, Prisma, PostgreSQL.

## Quickstart

1) Copy env

```bash
cp .env.example .env
```

2) Install deps

```bash
pnpm install
```

3) Database

- Ensure PostgreSQL is running and `DATABASE_URL` is set.
- Generate client and push schema:

```bash
pnpm db:generate && pnpm db:push
pnpm seed
```

4) Dev server

```bash
pnpm dev
```

Visit http://localhost:3000

## Decisions

- REST API to enable React Native reuse.
- SSO: OIDC primary (Microsoft Entra), SAML secondary. Fallback: email verification limited to allow-listed domains. Dynamic institution config stored in DB.
- Security defaults: strict headers, cookie flags, rate limits (to add), input validation via Zod.
- Privacy: Consent on first login, delete/export endpoints (to implement), PIPEDA-aligned language.

## Add Institution

- Insert `Institution` with `ssoType` and configuration JSON (`oidcConfig` or `samlConfig`).
- Add `EmailDomain` rows for allowed domains for fallback.

## Scripts

- dev, build, start, lint, typecheck, test, test:e2e, db:generate, db:push, db:migrate, seed, format

## TODO (next)

- Implement OIDC/SAML flows and callbacks.
- Email fallback: magic link + 6-digit code, Redis rate limit.
- Profile, preferences, feed, swipe, matches, chat, safety endpoints & UI.
- Tests (unit/integration/E2E) and CI pipeline.