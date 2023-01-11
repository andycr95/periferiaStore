FROM node:latest as build

WORKDIR /usr/app
COPY ./app /usr/app/
RUN npm install
RUN npm run build


FROM nginx:latest
WORKDIR /usr/app
COPY ./app/package.json ./app/package-lock.json ./
RUN ls -a
COPY --from=build /usr/app/dist/app /usr/share/nginx/html
EXPOSE 80