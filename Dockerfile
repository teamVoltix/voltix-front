FROM node:22.0.0-alpine AS develop-stage

WORKDIR /front

COPY package*.json  /front

COPY . /front

RUN npm install -g @angular/cli

RUN npm install

RUN ng update

#RUN  ng build  --watch=true  --no-aot  --verbose
RUN ng build


# production stage
FROM nginx:alpine AS frontend

COPY --from=develop-stage /front/dist/template-angular-ts/browser/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

RUN mkdir -p /usr/share/nginx/html/public

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
