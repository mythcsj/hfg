FROM node:18-slim as build
USER root
RUN npm rm yarn -g
RUN npm i pnpm -g
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . ./
RUN pnpm build

FROM node:18-slim as run
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/dist ./dist/
EXPOSE 8080
CMD [ "node", "./dist" ]