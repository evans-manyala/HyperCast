# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

ENV NODE_ENV=production
ENV PORT=8081

EXPOSE 8081

CMD ["npx", "serve", "-s", "build", "-l", "8081"]
