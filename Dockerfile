FROM node:18

ENV DATABASE_HOST=database
ENV DATABASE_NAME=me2gift
ENV PORT=3001
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=postgres
ENV DATABASE_ENABLE_LOGGING=false
ENV PASSWORD_SALT_ROUNDS=10
ENV JTW_EXPIRY=120m
ENV JTW_SECRET=My-sUpEr-\$ecrEt-Password1!
ENV APP_ADMIN_EMAIL=admin@me2gift.com
ENV APP_ADMIN_INITIAL_PASSWORD=admin

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
EXPOSE 3001
ENTRYPOINT [ "node", "/opt/me2gift/main.js" ]
