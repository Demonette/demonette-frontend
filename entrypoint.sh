#!/bin/bash
sed -i s@\${PRODUCTION_URL}@$PRODUCTION_URL@g /dist/static-demonette/js/*
nginx -g "daemon off;"
