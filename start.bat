cd ./DB
docker-compose up -d 

timeout 30

cd ..
cd ./API
docker-compose up -d 

cd ..
cd ./Frontend
docker-compose up -d 

cd ..
cd ./DB
node insertScript.js