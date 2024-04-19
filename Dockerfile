FROM node:18-alpine

WORKDIR /app/backend

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "start:prod"]
