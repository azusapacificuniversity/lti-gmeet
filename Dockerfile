FROM quay.apu.edu/intdev/oracle-client:latest
MAINTAINER Azusa Pacific University

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash - && \
    yum install -y nodejs

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
