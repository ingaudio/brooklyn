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

# GIT workflow

## Check current status and branch
git status
On branch dev-ci
Your branch is up-to-date with 'origin/dev-ci'.
nothing to commit, working directory clean

## Start new development/fixing (aka Feature Branch Approach)

- Update Master With Last Version
git checkout master
git pull

- Create Local/Remote feature branch
git checkout -b <feature_branch>
git push -u origin <feature_branch>

## Update feature branch with last version of code

- On feature branch
git checkout <feature_branch>

- Rebase (put "master" as a base for your development)
git fetch origin
git rebase origin/master
!!!solve conflict!!!

## End Development

- On feature Branch
git checkout <feature_branch>

- Update with remote repository
git pull

- Rebase with master
git fetch origin
git rebase origin/master

- Fix all conflict and missing commit

- Update local with remote 
git push

- Start a pull-request
!!! At the end of the process the branch will be deleted (remote) - DON'T USE THE BRANCH ANYMORE!!!
(start another branch for other development)

- Delete branch locally (NOT REMOTE!!!)
git branch -d <feature_branch>

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


