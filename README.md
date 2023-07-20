# Child Welfare Progress Dashboard

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

Follow these steps to create a dashboard for a new comapre page topic for state-level or CA counties data (airtables already exist for these regions):

1. Add data to the airtable. This includes:
   - Creating a new value for the `Topic` column (this maps to `PracticeArea` in the tool)
   - Adding a row for each practice, with the practice `Name` in the first `Name` column, and the newly created `Topic` selected for the `Topic` column.
1. Update types in [`src/types/compare.ts`](/src/types/compare.ts), adding the new `Topic` to the `PracticeArea` type, and the new practice `Name`s to the `PracticeName` type
1. Extend various mapping constants in [`src/utils/compare.tsx](/src/utils/compare.tsx) to include auxillary information for displaying compare dashboards for the new topic:
   - Add an entry in the `COMPARE_TOPIC_FULL_TITLE_MAP`, providing a full title for the new compare topic in case it is different from the topic created in Airtable. If the topic name in air table is the same as the desired presentation name, simply add an entry mapping the air table practice name to itself (i.e. "Perfectly good name": "Perfectly good name")
   - Create a new dictionary of topic-specific links for each practice. These are used to link each practice in the dashboard to a page with more information about the practice. If there is no page with additional information for a given practice, leave it out of the dictionary and the topic will not be linked in the dashboard.
   - Add an entry in the `COMPARE_TOPIC_PRACTICE_LINKS_MAP`, linking the topic-specific map you created in the previous step with the appropriate `PracticeArea`. If none of the practices for this topic have any links, you can add an entry linking the topic to an empty dictionary (`"New Topic": {}`)
   - Add an entry in the `COMPARE_TOPIC_CONTENT_MAP`, providing content to be displayed at the top of the compare dashboard for the new `PracticeArea`.
1. If necessary, update `COMPARE_DASHBOARDS` in [`src/utils/compare.tsx`](/src/utils/compare.tsx), which is dynamically generated from `COMPARE_DASHBOARD_FULL_TITLES` to include an item for each dashboard that should exist for all regions and practice areas. By default, the application will have only a state-level dashboard for a newly created practice area. For example, if CA county dashboard is desired for the given practice area, then logic in `getCompareDashboards` must be updated to handle the practice area in the manner as `Family Finding`.

If creating a new dashboard for a new geo region (e.g. a new county-administered state), a few additional steps will be required:

1. Create a new table in AirTable to contain reference data for new region counties, including at least a name and population.
1. Create a new table in AirTable to hold data for the new region. The table will need to have a `Name` column of String type, a `Topic` (`PracticeArea`) column of Single Select type with appropriate `Topic` options, and one column for each county of Single Select type with appropriate `Value` options. Replace spaces in county names with `_`. Table name should start with "Practices".
1. Update [`useDataPractices`](/src/hooks/useDataPractices.ts) airtable query hook to include data from the newly created airtable. If table was named correctly (starting with "Practices"), it will be automatically recognized by the query. Add each new county name (column names in the new table) to the list of queried fields.
1. Expand data processing logic to add handling for new county-administered state. This should be very similar to the existing logic for CA Counties data in `mapPracticesByRegion` helper function in `useDataPractices` hook. Be sure to include the additional data in the return object in the appropriate place. For example, if data was added for New York, the return type for `mapPracticesByRegion` should look like:
   ```
      return {
      state: practicesByState,
      county: {
         CA: practicesByCACounty
         NY: practicesByNYCounty // new county data included here!
      }
      };
   ```
1. Update `getCompareDashboards` and `getPathToDashboard` in [`src/utils/compare.tsx`](/src/utils/compare.tsx) to create compare dashboards for the new region and ensure routing to the new dashboards works correctly.
