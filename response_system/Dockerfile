
FROM node:18-alpine

WORKDIR /app

EXPOSE 3004

ENV NODE_ENV=development

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]