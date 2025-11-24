FROM node:22-alpine

WORKDIR /app

RUN corepack enable

ADD package.json /app

ADD pnpm-lock.yaml /app

RUN pnpm install

ADD . /app

RUN pnpm run build

EXPOSE 8000

CMD ["pnpm", "start"]

