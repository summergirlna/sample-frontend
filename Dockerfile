FROM node:24-alpine AS build

WORKDIR /app

COPY sample-frontend/package.json sample-frontend/package-lock.json ./

RUN npm ci

COPY sample-frontend ./

ARG VITE_GRAPHQL_ENDPOINT=http://localhost:8082/graphql
ARG VITE_BFF_BASIC_AUTH_USERNAME=sample_user
ARG VITE_BFF_BASIC_AUTH_PASSWORD=sample_password

ENV VITE_GRAPHQL_ENDPOINT=$VITE_GRAPHQL_ENDPOINT
ENV VITE_BFF_BASIC_AUTH_USERNAME=$VITE_BFF_BASIC_AUTH_USERNAME
ENV VITE_BFF_BASIC_AUTH_PASSWORD=$VITE_BFF_BASIC_AUTH_PASSWORD

RUN npm run build


FROM nginxinc/nginx-unprivileged:1.31-alpine

USER root

RUN apk upgrade --no-cache

USER 101

COPY sample-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080