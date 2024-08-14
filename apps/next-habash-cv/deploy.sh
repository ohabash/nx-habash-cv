#!/usr/bin/env bash

# build
nx build next-habash-cv;

# push to github "ohabash/next-habash-cv"
# Desc: pushing will trigger a deployment in Heroku
git add -A;
git commit -am "$1";
git push;
