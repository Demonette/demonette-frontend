#!/bin/bash
sed -i s@\${PRODUCTION_URL}@$PRODUCTION_URL@g /dist/static/js/*
nginx -g "daemon off;"
