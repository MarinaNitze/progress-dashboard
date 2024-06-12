################################
### TO BUILD IMAGE
# docker build -t coram/playbook .
#
### TO RUN SERVER (requires rebuild if files change)
# docker run -it --rm -p "8080:8080" coram/playbook
#
### TO RUN TERMINAL WITH LOCAL FILES (i.e. for local development with live file mapping)
#   1. docker run -it --rm -p "8080:8080" -v "$PWD:/app" coram/playbook bash
#   2. npm install
#   3. npm run start
################################

FROM node:20.8.1

# Put files in /app
WORKDIR /app
COPY . .

# Build the application
RUN npm install

# Run a server if executing the container on port 8080
CMD npm run start