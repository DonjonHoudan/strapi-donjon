FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN npm install -g node-gyp
RUN yarn install
RUN yarn add pg
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "start"]
RUN -v /folder/on/host/to/store:/public/uploads
