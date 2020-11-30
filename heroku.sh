#!/bin/bash

cd server
docker build -t todo-sergey .
docker tag todo-sergey registry.heroku.com/todo-sergey/web
docker push registry.heroku.com/todo-sergey/web
heroku container:login

heroku container:push web --app todo-sergey
heroku container:release web --app todo-sergey