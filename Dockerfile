FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV DBIP host.docker.internal

ENV PORT 80

EXPOSE $PORT 8080

CMD [ "npm", "start" ]
