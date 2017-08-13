FROM node

MAINTAINER gino20.hong@gmail.com

ENV DIST=/app
RUN mkdir -p $DIST

WORKDIR $DIST

ADD package.json $DIST

RUN yarn install

ADD . $DIST
