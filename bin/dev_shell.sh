set -e

docker build -t cwp .
docker run -it --rm -p "8080:8080" -v "$PWD:/app" cwp bash
