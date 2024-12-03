docker build -t cwp .
docker run -it --rm -p "8080:8080" -v "%CD%:/app" cwp bash
