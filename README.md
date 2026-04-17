# liza_alert_web

Web frontend for Liza Alert.

## Project docs

- [Product vision](docs/00_product_vision.md)
- [MVP roadmap](docs/01_mvp_roadmap.md)
- [Tech stack recommendation](docs/02_tech_stack.md)
- [Collaboration and reports](docs/03_collaboration_and_reports.md)
- [Current status report](docs/04_status_report_2026-04-16.md)

## Stack

- React
- TypeScript
- Vite

## Local development

### 1. Start backend

Backend is expected to run locally on `127.0.0.1:8080`.

```bash
cd ../liza_alert_backend
./mvnw.cmd spring-boot:run
```

### 2. Start web frontend

```bash
cd ../liza_alert_web
npm install
npm run dev
```

Open:

- `http://127.0.0.1:5173`

## Local API integration

During development the Vite dev server proxies `/api/*` requests to:

- `http://127.0.0.1:8080`

That means the frontend code can call relative URLs such as:

- `/api/v1/lost-cases`

without hardcoding the production domain.

## Build

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Preview URL:

- `http://127.0.0.1:4173`

## Deploy on VPS

Server-side layout:

- source repo: `/srv/liza_alert_web`
- built static output: `/var/www/liza_alert_web`

Run deploy directly on the VPS:

```bash
cd /srv/liza_alert_web
bash scripts/deploy.sh
```

What the script does:

1. checks that the git working tree is clean
2. runs `git pull --ff-only`
3. runs `npm install`
4. runs `npm run build`
5. copies built `dist/` to `/var/www/liza_alert_web`
6. verifies `https://lizaalertspb.ru`

Optional overrides:

```bash
DEPLOY_DIR=/var/www/liza_alert_web DEPLOY_SITE_URL=https://lizaalertspb.ru bash scripts/deploy.sh
```

## Environment

Template file:

- `.env.example`

Default local setting:

```env
VITE_API_BASE_URL=/api
```
