FROM 10.135.20.20/hzmes/nginx:1.19.6-alpine

RUN mkdir -p /data
RUN ls
RUN pwd
COPY ./dist /data

RUN rm /etc/nginx/conf.d/default.conf

ADD ui.conf /etc/nginx/conf.d/default.conf

RUN /bin/sh -c 'echo init ok'
