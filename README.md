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
   - Creating a new value for the `Topic` column
   - Adding a row for each practice, with the practice `Name` in the first `Name` column, and the newly created `Topic` selected for the `Topic` column.
1. Update types in [`src/types/compare.ts`](/src/types/compare.ts), adding the new `Topic` to the `Topic` type, and the new practice `Name`s to the `PracticeName` type
1. Extend various mapping constants in [`src/utils/compare.tsx](/src/utils/compare.tsx) to include auxillary information for displaying compare dashboards for the new topic:
   - Add an entry in the `COMPARE_TOPIC_FULL_TITLE_MAP`, providing a full title for the new compare topic in case it is different from the topic created in Airtable. If the topic name in air table is the same as the desired presentation name, no entry in this dictionary is required and the `Topic` will be used as the display full title.
   - Create a new dictionary of topic-specific links for each practice. These are used to link each practice in the dashboard to a page with more information about the practice. If there is no page with additional information for a given practice, leave it out of the dictionary and the topic will not be linked in the dashboard.
   - Add an entry in the `COMPARE_TOPIC_PRACTICE_LINKS_MAP`, linking the topic-specific map you created in the previous step with the appropriate `Topic`. If none of the practices for this topic have any links, you can add an entry linking the topic to an empty dictionary (`"New Topic": {}`)
   - Add an entry in the `COMPARE_TOPIC_CONTENT_MAP`, providing content to be displayed at the top of the compare dashboard for the new `Topic`.
