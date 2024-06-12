# Architecture 

![software architecture diagram described in other sections](images/architecture_diagram.png)

## Code Parts

- [**11ty**](https://www.11ty.dev/): A JavaScript and Markdown based platform that generates static websites.
- [**Static CMS**](https://www.staticcms.org/): A content management systems that can read, write, and publish changes to a GitHub repository. It does not require an application server, but runs as a single page application hosted at the `/admin` endpoint. It uses GitHub as an authentication and authorization mechanism.

## Infrastructure 

- [**GitHub**](https://github.com/): Store the application's code and is used to authenticate/authorize contributors.
- [**Netlify**](https://www.netlify.com/): Hosts the application, including drafts and production deployments. Has a single user (but could have more if configured) that is linked to a GitHub account for access to the repository.

## Publish Workflow

1. User goes to `<url>/admin` to access Static CMS
1. Static CMS asks user to authenticate with their GitHub user account, which also checks the repository for read/write authorization
1. User add, deletes, or modifies a piece of content in Static CMS
1. Static CMS saves the draft in a GitHub branch
1. Netlify sees the draft and deploys it
1. User can preview the draft at a draft URL
1. User publishes the content
1. Static CMS saves the published content in the main branch
1. Netlify sees the published content and deploys it to the hosting behind `<url>`

## Maintenance Notes

### CMS Branching

Right now, Static CMS does not create a branch as diagrammed and instead just stores changes on the editor's computer until publishing. However, this feature is coming soon and can be upgraded in the future to do this. This will better enable previewing content before publishing.

When that time comes, the version number in `@staticcms/app@^3.3.0` can be updated in [`src/admin/index.html][/src/admin/index.html].

### Authentication and Authorization

The site relies on the following mechanisms for authentication and authorization. Links to get to these settings are below and are accessible to CoramIT and other admin users (if any):

- [**Netlify/GitHub Repo Writing**](https://github.com/coram-uk/coram-playbook/settings/installations): This allow Netlify to push branch deployment URLs to pull requests for preview deployments.
- [**Netlify/GitHub Authentication and Authorization**](https://github.com/organizations/coram-uk/settings/installations): This enables users to login via Static CMS base by allowing Netlify to check if a user is within the Coram UK GitHub Organization.
- [**GitHub User Authentication**](https://github.com/orgs/coram-uk/people): A user must be a member of the [Coram UK GitHub Organization](https://github.com/coram-uk) in order to authenticate via Static CMS.
- [**GitHub User Authorization: Admins**](https://github.com/orgs/coram-uk/teams/coram-playbook-admins): A user in this team can modify settings in GitHub and also contribute content to the site.
- [**GitHub User Authorization: Contributors**](https://github.com/orgs/coram-uk/teams/coram-playbook-contributors): A user in this team can contribute content to the site, but can't modify org/repo settings.

### Domain Setup

When the site's URLs need to be updated, the place to do that is within [Netlify's domain settings](https://app.netlify.com/teams/coram/dns). By adding a domain here, it'll provide the settings to add to your domain registration. Coram IT should be able to access these.