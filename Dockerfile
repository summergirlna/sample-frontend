FROM node:24-alpine AS build

WORKDIR /app

COPY sample-frontend/package.json sample-frontend/package-lock.json ./

RUN npm ci

COPY sample-frontend ./

ARG VITE_GRAPHQL_ENDPOINT=http://localhost:8082/graphql
ENV VITE_GRAPHQL_ENDPOINT=$VITE_GRAPHQL_ENDPOINT

RUN npm run build


FROM nginx:1.27-alpine

COPY sample-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80