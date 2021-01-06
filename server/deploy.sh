#!/bin/bash

echo What should the version be?
read version

docker build -t tomimarkus110/lireddit:$version .
docker push tomimarkus110/lireddit:$version

ssh root@46.101.16.68 "
docker pull tomimarkus110/lireddit:$version &&
docker tag tomimarkus110/lireddit:$version dokku/api:$version &&
dokku tags:deploy api $version
"

