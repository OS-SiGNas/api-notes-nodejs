FROM node:18.14.2-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm i -g npm
RUN npm update 
RUN npm i

COPY . .

EXPOSE 3334

CMD ["npm","run", "dev"]

FROM node:18.14.2-alpine as production

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm i -g npm
RUN npm update 
RUN npm ci --only=production

COPY --from=dev /app/bin ./bin 

CMD ["node","bin/index.js"]
