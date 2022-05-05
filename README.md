# Progress Dashboard

The Child Welfare Progress Dashboard is an actionable playbook of best practices in child welfare and foster care, put together by a working group of over twenty member agencies. The playbook details best practices across foster care, from recruitment to placements, along with implementation and cost details. Additionally, the dashboard feature allows users to compare which practices have been implemented by 55 states and territories.

## Running

(With `node` (`v16`+) and `npm` installed:)

Install: `npm ci`

Run: `npm run prepare`

Copy `.env.sample` into a file named `.env` and enter necessary values.

Start dev: `npm start`

Build and start prod locally: `npm run build && npm run serve`

## CMS
This website uses netlify-cms to manage a lot of it's content. To access the cms, simply add `/admin` to the domain url.

Users are granted access/edit permissions via the netlify site workspace.

## Deployment
This site is hosted with netlify and there are integrations between the repository hosted on github and the site workspace in netlify.

Whenever a new pull request is created, netlify will build a deployment preview of the code change and the url for the preview can be found in the pull request conversation on github.

To deploy to the production site, merge code into the main branch and netlify will start the ci/cd pipeline to build and deploy to production.
