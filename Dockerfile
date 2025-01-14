FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV FK_API https://beta.frikanalen.no/api/v2
ENV FK_MEDIA https://beta.frikanalen.no/api/v2
ENV FK_GRAPHQL https://beta.frikanalen.no/graphql

RUN NODE_ENV=development yarn install --frozen-lockfile && NODE_ENV=production yarn build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --chown=node --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock ./

USER node

CMD yarn run start

EXPOSE 3000
