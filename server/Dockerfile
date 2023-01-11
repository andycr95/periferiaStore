FROM node:lts-alpine
WORKDIR /usr/app
COPY ./server .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:lts-alpine
WORKDIR /usr/app
COPY ./server/package.json ./
RUN ls -a
RUN npm install ci
COPY --from=0 /usr/app/build .
COPY --from=0 /usr/app/prisma ./prisma
RUN echo "DATABASE_URL=postgresql://postgres:postgres@database:5432/periferiaStore?schema=public?encrypt=false" >> ./.env
RUN npx prisma generate
EXPOSE 5000
CMD ["node","src/index.js"]