# me2gift-backend

# Project Setup

1. Install Docker: https://docs.docker.com/engine/install/
2. Clone the project: `git clone https://github.com/bergauznoam/me2gift-backend`
3. `cd me2gift-backend`
4. `docker compose build backend`

## Run in DEV mode:

1. `docker compose up dev -d`
2. `docker exec -it me2gift-dev bash`
3. (Inside the container) `cd /tmp/me2gift`
4. (Inside the container) `npm run start:dev`

## Run in PROD mode:

1. `docker compose up backend -d`

Swagger Documentation: http://localhost:3001/docs
API Endpoint: http://localhost:3001/api
