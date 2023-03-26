FROM nginx:1.21.0-alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]