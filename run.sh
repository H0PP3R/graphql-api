docker-compose -f docker-compose-dev.yaml down
docker-compose -f docker-compose-dev.yaml up -d
sleep 5
docker exec -it roach-single ./cockroach sql --insecure --user=root --host=localhost:26257 --execute="CREATE DATABASE IF NOT EXISTS graphql_api;"
yarn
yarn start:dev