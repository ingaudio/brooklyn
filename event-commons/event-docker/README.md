
# Docker shell
eval "$(docker-machine env default)"

# Build Containers (needed only if you change some configuration)
docker-compose build

# Start Containers
docker-compose up -d

# Stop Containers
docker-compose down

# Check Logs
docker-compose logs -f

# Check Containers
docker ps

# Enter in container
docker exec -it <CONTAINER ID> bash

