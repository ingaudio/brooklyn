# README

This readme file will help you :)

# Eclipse
How to work in eclipse...

## Cleanup old files
~~~~gradle cleanEclipse~~~~

## Create eclipse files
~~~~gradle eclipse~~~~

## Import in workspace
use the eclipse functionality: import as "Existing Gradle Project" => event-commons

# Project Lifecycle

## Clean
Clean all projects artifacts
~~~~gradle clean~~~~




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

## QUICK
# Start Dev Mode
gradle devMode

# Stop Dev Mode (stop docker)
gradle undevMode

# Clean Docker Data (like solr index + configuration)
gradle dockerClean


