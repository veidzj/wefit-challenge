FROM node:20 as builder

WORKDIR /usr/src/wefit-challenge

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

COPY . .

FROM node:20-alpine

WORKDIR /usr/src/wefit-challenge

COPY --from=builder /usr/src/wefit-challenge .

RUN yarn install --omit=dev --ignore-scripts

ENV PORT=5000

EXPOSE $PORT

CMD ["yarn", "start"]
