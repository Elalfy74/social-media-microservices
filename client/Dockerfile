FROM node:slim

WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
# Development Command
CMD ["yarn","dev"]
