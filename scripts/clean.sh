#!/bin/bash
echo "Cleaning up unused Docker images and containers..."
docker system prune -a --volumes -f
echo "System is clean"