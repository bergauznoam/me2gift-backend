FROM node:18
RUN mkdir -p /tmp/me2gift /opt/me2gift
WORKDIR /tmp/me2gift
COPY . .
RUN npm install --global @nestjs/cli && \
    npm install && \
    npm run build
WORKDIR /opt/me2gift
RUN cp -rf /tmp/me2gift/dist/* /opt/me2gift && \
    mv /tmp/me2gift/node_modules /opt/me2gift && \
    rm -rf /tmp/me2gift
EXPOSE 3000
ENTRYPOINT [ "node", "/opt/me2gift/main.js" ]
