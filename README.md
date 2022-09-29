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

## Creating a new compare dashboard

Follow these steps to create a dashboard for a new comapre page topic

1. Add data to the airtable. This includes:
   - Creating a new value for the Topic column
   - Adding rows for each practice for the new Topic with the new Topic value for the Topic, and filling in the practice status Values for each state
1. Update types in [`src/types/compare.ts`](/src/types/compare.ts), adding the new Topic to the Topic type, and the new practice Names to the PracticeName type
1. Extend various mapping constants in [`src/utils/compare.tsx](/src/utils/compare.tsx) to include new content including:
   - Entry in the full title map, providing a full title for the new compare topic incase it is different from the topic created in Airtable
   - A new dictionary of link paths for pages with more information about each individual compare topic practice
   - Entry in the practice links map, associating the newly created diction of practice links with the appropriate topic name
   - Entry in the content map, providing the content for the new compare dashboard page to be displayed at the top of the page.
