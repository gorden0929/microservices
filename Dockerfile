FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
