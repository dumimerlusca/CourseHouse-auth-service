FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN yarn

RUN yarn build


CMD ["yarn","start:dev"]