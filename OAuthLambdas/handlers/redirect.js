const AWS = require('aws-sdk');

/**
 * Redirects users to our NetlifyCms GitHub OAuth2.0 page
 */
exports.handler = async () => {
  const region = 'us-east-1'; // the Region we saved OAuth App Client Id into the AWS SecretsManager
  const secretsManager = new AWS.SecretsManager({ region }); // SecretsManager API
  const SecretId = 'GH_OAUTH_SECRETS'; // The Secret container we want to access (Not the values but this holds the values)
  const { SecretString } = await secretsManager
    .getSecretValue({ SecretId })
    .promise(); // This gives us all of the values from the Secrets Container
  const { CLIENT_ID } = JSON.parse(SecretString); // SecretString stores our values as a string so we need to transform it into an object to make it easier to work with
  const Location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo%20user`; // Standard GitHub OAuth URL learn more here: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity
  return {
    statusCode: 302, // "302" required for AWS Lambda to permit redirects
    headers: { Location }, // "Location" header sets redirect location
  };
};
