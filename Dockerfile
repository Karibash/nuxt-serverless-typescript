FROM node:13.8.0-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache && \
    npm install -g npm && \
    apk add git

WORKDIR /var/www
