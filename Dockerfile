FROM node:9.7.0 as build
COPY / /demonette-frontend
RUN cd demonette-frontend && npm install && npm run build

FROM nginx:latest
MAINTAINER Simon Meoni
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY --from=build /demonette-frontend/dist /dist
