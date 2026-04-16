#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_HOST="${DEPLOY_HOST:-185.21.8.116}"
REMOTE_PORT="${DEPLOY_PORT:-2222}"
REMOTE_USER="${DEPLOY_USER:-denis}"
REMOTE_DIR="${DEPLOY_DIR:-/var/www/liza_alert_web}"
REMOTE_APP_DIR="${DEPLOY_APP_DIR:-/home/denis/apps/liza_alert_web}"
SITE_URL="${DEPLOY_SITE_URL:-https://lizaalertspb.ru}"
LOCAL_USER="$(whoami)"

info() {
  printf '[INFO] %s\n' "$1"
}

fail() {
  printf '[ERROR] %s\n' "$1" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Команда '$1' не найдена"
}

require_command ssh
require_command curl
require_command git

cd "$APP_DIR"

info "Каталог проекта: $APP_DIR"
info "Локальный пользователь: $LOCAL_USER"
info "Целевой deploy: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PORT"

if [[ ! -f package.json ]]; then
  fail "Не найден package.json. Запусти скрипт из репозитория liza_alert_web"
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  fail "Скрипт рассчитан на ветку main, сейчас активна '$CURRENT_BRANCH'"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Рабочее дерево не чистое. Сначала закоммить или убери локальные изменения."
fi

if [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  fail "Есть неотслеживаемые файлы. Сначала убери их или добавь в .gitignore."
fi

info "Обновляю и собираю web на VPS"
ssh -o BatchMode=yes -o ConnectTimeout=10 -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
  "mkdir -p '$REMOTE_APP_DIR' && if [ -d '$REMOTE_APP_DIR/.git' ]; then cd '$REMOTE_APP_DIR' && git pull --ff-only; else git clone https://github.com/Denis0872/liza_alert_web.git '$REMOTE_APP_DIR' && cd '$REMOTE_APP_DIR'; fi && npm install && npm run build && sudo install -d -m 755 '$REMOTE_DIR' && sudo rm -rf '$REMOTE_DIR'/* && sudo cp -r '$REMOTE_APP_DIR'/dist/. '$REMOTE_DIR'/"

info "Проверяю сайт после деплоя"
HTTP_CODE="000"
for _ in {1..12}; do
  HTTP_CODE="$(curl -sk -o /tmp/liza_alert_web_health.out -w '%{http_code}' "$SITE_URL" || true)"
  if [[ "$HTTP_CODE" == "200" ]]; then
    break
  fi
  sleep 3
done

if [[ "$HTTP_CODE" != "200" ]]; then
  cat /tmp/liza_alert_web_health.out >&2 || true
  fail "Проверка сайта вернула HTTP $HTTP_CODE"
fi

info "Деплой web завершен успешно"
info "Текущий commit: $(git rev-parse --short HEAD 2>/dev/null || printf 'no-git')"
info "Проверенный URL: $SITE_URL"
