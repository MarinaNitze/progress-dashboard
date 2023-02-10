exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/compare/Family%20Finding`,
    toPath: `/compare/states/Family%20Finding`,
  });

  createRedirect({
    fromPath: `/compare/Background%20Checks`,
    toPath: `/compare/states/Background%20Checks`,
  });
};
