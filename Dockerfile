FROM node:22-alpine

WORKDIR /app

# Needed for health checks
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
