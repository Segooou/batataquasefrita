# build stage
FROM node:18.15.0-alpine3.16 as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

COPY . /app
RUN npm run build

# final stage 
FROM nginx:1.23.3-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
