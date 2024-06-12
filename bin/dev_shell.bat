docker build -t coram/playbook .
docker run -it --rm -p "8080:8080" -v "%CD%:/app" coram/playbook bash
