# Use node:slim as the build stage
FROM node:slim as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the client directory
COPY client/package*.json /app/

# Install dependencies
RUN yarn install

# Copy all other files from the client directory
COPY client/. /app/

# Set the build configuration (e.g., production)
ARG configuration=production

# Build the client code
RUN yarn build

# Use nginx as the final stage
FROM nginx:1.15

# Copy the built files from the previous stage to nginx's HTML directory
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
