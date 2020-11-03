FROM node:14

# Create app directory
WORKDIR /app

ADD ./package.json /app/
RUN yarn

ADD . /app/

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "run", "dev" ]
