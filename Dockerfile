FROM node:latest AS builder
ADD . /bin/
WORKDIR /bin/
RUN npm install
RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=builder /bin/build . 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]