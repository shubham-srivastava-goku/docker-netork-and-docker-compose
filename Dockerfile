FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# If mongo is running on local host
# ENV DBIP host.docker.internal

# If mongo server is part of same network as node server
ENV DBIP mongo

ENV PORT 80

EXPOSE $PORT 8080

CMD [ "npm", "start" ]
