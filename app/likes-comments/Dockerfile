FROM node:slim

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
# Development Command
CMD ["yarn","start:dev"]
