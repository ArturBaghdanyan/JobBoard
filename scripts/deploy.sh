#!/bin/bash

echo "Starting Jobboard deployment proccess..."

echo "Stopping existing containers.."
docker compose down

echo "Building and starting Docker containers..."
docker compose up --build -d

echo "✨ JobBoard is successfully deployed and running at http://localhost:5473 !"