FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Образ всегда деплоится по под-пути /phonebook/, поэтому base запекается в /phonebook/.
# Чтобы переопределить для другого окружения: docker build --build-arg VITE_BASE=/...
ARG VITE_BASE=/phonebook/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
RUN npm i -g serve
