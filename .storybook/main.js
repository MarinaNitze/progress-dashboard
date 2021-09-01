const path = require('path');

module.exports = {
  // You will want to change this to wherever your Stories will live
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules = config.module.rules.filter(
      rule => rule.test.toString() !== '/\\.css$/',
    );
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.(sa|sc|c)ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.module\.(sa|sc|c)ss$/i,
      include: path.resolve(__dirname, '../src'),
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    });
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push([
      require.resolve('babel-plugin-remove-graphql-queries'),
      {
        stage: config.mode === `development` ? 'develop-html' : 'build-html',
        staticQueryDir: 'page-data/sq/d',
      },
    ]);
    return config;
  },
};
