# liza_alert_web

Web frontend for Liza Alert.

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

## Deploy to VPS

The frontend is deployed from git on the VPS.

Server-side layout:

- source repo: `/home/denis/apps/liza_alert_web`
- built static output is copied to: `/var/www/liza_alert_web`

Run deploy from the project root:

```bash
bash scripts/deploy.sh
```

What the script does:

1. checks that local git working tree is clean
2. connects to the VPS via SSH
3. updates `/home/denis/apps/liza_alert_web` with `git pull --ff-only`
4. runs `npm install` and `npm run build` on the VPS
5. copies built `dist/` to `/var/www/liza_alert_web`
6. verifies `https://lizaalertspb.ru`

Default deploy target:

- host: `185.21.8.116`
- port: `2222`
- user: `denis`
- remote app dir: `/home/denis/apps/liza_alert_web`
- web root: `/var/www/liza_alert_web`
- site: `https://lizaalertspb.ru`

Override values if needed:

```bash
DEPLOY_USER=denis DEPLOY_HOST=185.21.8.116 DEPLOY_PORT=2222 DEPLOY_APP_DIR=/home/denis/apps/liza_alert_web bash scripts/deploy.sh
```

## Environment

Template file:

- `.env.example`

Default local setting:

```env
VITE_API_BASE_URL=/api
```
