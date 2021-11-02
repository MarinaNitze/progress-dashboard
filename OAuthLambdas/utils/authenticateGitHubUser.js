const AWS = require('aws-sdk');
const fetch = require('node-fetch');

const { getScript } = require('./callbackHtmlPage');

async function authenticateGitHubUser(gitHubAuthCode, cb) {
  const region = 'us-east-1';
  const client = new AWS.SecretsManager({ region });
  const SecretId = 'GH_OAUTH_SECRETS';
  const { SecretString } = await client.getSecretValue({ SecretId }).promise();
  const { CLIENT_ID, CLIENT_SECRET } = JSON.parse(SecretString);
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: gitHubAuthCode,
    }),
  };
  const data = await fetch(
    'https://github.com/login/oauth/access_token',
    postOptions,
  );
  const response = await data.json();

  cb(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: getScript('success', {
      token: response.access_token,
      provider: 'github',
    }),
  });
}

exports.authenticateGitHubUser = authenticateGitHubUser;
