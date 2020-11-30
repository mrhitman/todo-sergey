FROM node:12-alpine

RUN mkdir todo
WORKDIR /todo
COPY src src
COPY nest-cli.json nest-cli.json
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY yarn.lock yarn.lock

RUN yarn install
RUN yarn build
EXPOSE 4000
CMD yarn start:prod