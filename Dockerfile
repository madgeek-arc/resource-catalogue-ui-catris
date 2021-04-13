### Install and Build ###
FROM node:lts AS build_cont
ARG build
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
COPY . .
RUN npm run build:$build


### Create Container ###
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf.tmpl
COPY env_variables.sh /usr/share/nginx/
COPY --from=build_cont /usr/src/app/dist/resource-catalogue-ui /usr/share/nginx/html

RUN apk update && apk add bash
ENTRYPOINT ["/bin/bash", "/usr/share/nginx/env_variables.sh"]
EXPOSE 80
