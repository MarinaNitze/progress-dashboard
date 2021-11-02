# Progress Dashboard

A dashboard for child welfare

## Running

(With `node` (`v16`+) and `npm` installed:)

Install: `npm ci`

Run: `npm run prepare`

Copy `.env.sample` into a file named `.env` and enter necessary values.

Start dev: `npm start`

Build and start prod: `npm run build && npm run serve`

## AWS Integration

### Prod deployment

Using aws s3 static website hosting configured with gatsby-plugin-s3 and a prebuilt s3 bucket
Using cloudfront distribution

### Deployment Previews

Using github actions in `.github/workflows/` to automate

- building s3 bucket as static site with necessary permissions on pull request
- buildilng and deploying pull request to s3 bucket on opening pull request
- synching s3 bucket on new commits to an open pull request
- deleting bucket and contents when a pull request is merged or closed

### Netlify CMS

Configuration of backend in `static/admin/config.yml`
Using aws lambda functions behind aws api gateways for authorization calls, code in `OAuthLambdas/` folder
Using github OAuth Apps to provide [OAuth service](https://github.com/organizations/Bloom-Works/settings/applications/1756326)
Using aws secret manager to store github secrets in aws.
