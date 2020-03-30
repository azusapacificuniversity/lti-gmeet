FROM node
MAINTAINER Azusa Pacific University

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY ./src/main .

EXPOSE 3000

RUN chmod -R u+x ./ && \
    chgrp -R 0 ./ && \
    chmod -R g=u ./ /etc/passwd

USER 10001

CMD ["node", "index.js"]
