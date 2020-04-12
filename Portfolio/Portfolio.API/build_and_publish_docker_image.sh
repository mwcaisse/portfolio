#!/bin/bash

OWNER=mwcaisse
GIT_REPO=portfolio
VERSION=1.0
IMAGE_NAME=portfolio-api
TAG="docker.pkg.github.com/${OWNER}/${GIT_REPO}/${IMAGE_NAME}:${VERSION}"


#build
docker build -t ${TAG} .
#publish
docker push ${TAG}


