const { authenticateGitHubUser } = require('../utils/authenticateGitHubUser')

exports.handler = async (e, _ctx, cb) => {
    try {
        return await authenticateGitHubUser(e.queryStringParameters.code, cb)
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e.message)
        }
    }
}