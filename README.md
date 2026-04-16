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

## Environment

Template file:

- `.env.example`

Default local setting:

```env
VITE_API_BASE_URL=/api
```
