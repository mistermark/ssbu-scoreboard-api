FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install
# RUN npm ci --only=production

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
