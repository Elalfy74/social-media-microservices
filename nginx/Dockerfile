# # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM node:slim as build-stage

# WORKDIR /app

# COPY ../client/package*.json /app/

# RUN yarn  install

# COPY ../client/ /app/
# COPY nginx.conf /app/
# #RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

# ARG configuration=production

# RUN yarn build

# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.15

COPY nginx.conf /etc/nginx/conf.d/default.conf