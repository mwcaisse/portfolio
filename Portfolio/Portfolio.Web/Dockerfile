FROM node:alpine as build

WORKDIR /build/src

COPY . .

RUN yarn install --frozen-lockfile
#RUN yarn build
RUN yarn run gulp distLocal

RUN mkdir -p /build/out
RUN cp -r ./dist-local/* /build/out

FROM nginx:alpine as runtime

COPY --from=build /build/out /usr/share/nginx/html
