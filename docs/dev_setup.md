# Developer Setup

## Docker Version

This sets up the site with a consistent runtime environment, and requires Docker to be installed and running. This will build a container and put you into a Bash shell where you can run Linux commands.

1. Navigate to the base of this repo in your terminal or command prompt
1. Launch the Bash shell:
    - Linux/Mac: `sh bin/dev_shell.sh`
    - Windows: `bin\dev_shell.bat`
1. Install dependencies (first time only or when `package.json` changes): `npm install`
1. Run the dev server: `npm run start`
1. View the site in your browser at [http://localhost:8080](http://localhost:8080)

From here, changes to files locally will rebuild the site.

## Local Version

This uses whatever NPM and Node version you have installed on your machine, and might use fewer system resources than the Docker install (i.e. better for lower powered machines). If something is not working using this setup, use the Docker version to see if the problem exists there.

With that said, this setup has been tested with Node.js 20.8.x.

1. Navigate to the base of this repo in your terminal or command prompt
1. Install dependencies (first time only or when `package.json` changes): `npm install`
1. Start server: `npm run start`
1. View the site in your browser at [http://localhost:8080](http://localhost:8080)

From here, changes to files will rebuild the site.