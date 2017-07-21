

# README

## Eclipse Integration

Eclipse: import as "Existing Gradle Project" => event-commons

## Run Containers (mongo, solr, etc...)
cd event-docker
docker-compose up -d

## Run Core
cd event-core
gradle bootRun

## Run Angular
cd event-web
ng serve

## Open Browser
http://localhost:4200