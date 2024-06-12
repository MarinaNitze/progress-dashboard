set -e

docker build -t coram/playbook .
docker run -it --rm -p "8080:8080" -v "$PWD:/app" coram/playbook bash
