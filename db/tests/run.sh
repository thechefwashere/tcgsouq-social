#!/usr/bin/env bash
# Applies the migrations to a throwaway Postgres and runs the checks.
# Needs postgresql server binaries on the box; nothing else.
set -euo pipefail

PGBIN="${PGBIN:-$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | tail -1)}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"
PORT="${PORT:-55432}"

cleanup() { "$PGBIN/pg_ctl" -D "$TMP/data" stop -m immediate >/dev/null 2>&1 || true; rm -rf "$TMP"; }
trap cleanup EXIT

"$PGBIN/initdb" -D "$TMP/data" -U runner --auth=trust >/dev/null
"$PGBIN/pg_ctl" -D "$TMP/data" \
  -o "-k $TMP -p $PORT -c listen_addresses=" -l "$TMP/pg.log" start >/dev/null
sleep 2

for f in "$ROOT"/db/migrations/*.sql; do
  echo "==> applying $(basename "$f")"
  psql -h "$TMP" -p "$PORT" -U runner -d postgres -v ON_ERROR_STOP=1 -q -f "$f"
done

for f in "$ROOT"/db/tests/*_test.sql; do
  echo "==> running $(basename "$f")"
  psql -h "$TMP" -p "$PORT" -U runner -d postgres -v ON_ERROR_STOP=1 -v root="$ROOT" -f "$f"
done

echo "OK"
