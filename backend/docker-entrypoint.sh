#!/bin/sh
set -e

php artisan storage:link --force 2>/dev/null || true
php artisan migrate --force

supervisord -c /etc/supervisord.conf
