FROM node

MAINTAINER gino20.hong@gmail.com

ENV DIST = /app

WORKDIR $DIST

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
