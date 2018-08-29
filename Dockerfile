FROM node:9.7.0 as build
COPY / /demonette-frontend
RUN cd demonette-frontend && npm install && npm run build

FROM nginx:stable
MAINTAINER Simon Meoni
ENV PRODUCTION_URL=http://localhost:3000
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY --from=build /demonette-frontend/dist /dist
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh
CMD ./entrypoint.sh
