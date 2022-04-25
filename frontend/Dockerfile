FROM node:8.10.0

WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY . .

RUN npm install
RUN npm install react-hot-loader
RUN npm install --loglevel verbose

EXPOSE 3000

CMD ["npm", "start"]