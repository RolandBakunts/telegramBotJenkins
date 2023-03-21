FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src

CMD ["npm", "run",  "dev"]