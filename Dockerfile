# This a multi-stage build Dockerfile that runs tests and builds small image only on success.
# 1. Base image to use if next step is a success
FROM node:10-alpine

MAINTAINER shangbi "liuliaixue@qq.com"

WORKDIR /home/backend

COPY .docker.env /home/backend/.env
COPY ./dist /home/backend/dist
COPY package.json /home/backend

RUN npm install

EXPOSE 4040
RUN node -v
RUN ls /home/backend
RUN ls /home/backend/dist
RUN cat /home/backend/dist/index.js
CMD node /home/backend/dist/index.js


