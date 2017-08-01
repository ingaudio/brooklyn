

# README

## Eclipse Integration

Eclipse: import as "Existing Gradle Project" => event-commons

## Run Containers (mongo, solr, etc...)
gradle dockerUp

or

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

## QUICK (only if parallel execution is enabled)
# Start Dev Mode
gradle devMode

# Stop Dev Mode (stop docker)
gradle undevMode

# Clean Docker Data (like solr index + configuration)
gradle dockerClean





####   Start Dev Enviroments 

## Run Dev Containers (mongo, solr)
gradle devDocker

## Run Dev Core
gradle devCore

## Run Angular
gradle devWeb


####    Stop Dev Enviroment

# Close Terminal Windows
premi CTRL+C in all opened terminal windows(containers,core,angular)

# Stop Docker 
gradle dockerDown




