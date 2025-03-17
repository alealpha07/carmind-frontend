FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_BASE_URL
ARG VITE_NOTIFICATION_URL
ARG VITE_PUBLIC_VAPID_KEY
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_NOTIFICATION_URL=$VITE_NOTIFICATION_URL
ENV VITE_PUBLIC_VAPID_KEY=$VITE_PUBLIC_VAPID_KEY
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
ENV NODE_ENV=production
CMD ["node", "build"]
