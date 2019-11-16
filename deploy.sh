#!/bin/bash
echo 'Deleting old directory...'
rm -rf science-starter
echo 'Cloning repo from GitHub...'
git clone https://github.com/owfm/science-starter.git
cd science-starter

echo 'Building new docker image...'
docker build -t science-starter .
echo 'Running new docker container on port 80.'
docker run -d -p 80:80 science-starter