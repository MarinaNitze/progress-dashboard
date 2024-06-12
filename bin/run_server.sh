set -e

docker build -t coram/playbook .
docker run -it --rm -p "8080:8080" coram/playbook
