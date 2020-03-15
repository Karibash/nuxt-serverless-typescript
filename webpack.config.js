const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');

module.exports = {
  mode: 'production',
  entry: {
    lambda: path.resolve(__dirname, './serverless/lambda.ts'),
    local: path.resolve(__dirname, './serverless/local.ts'),
  },
  output: {
    path: path.resolve(__dirname, './.serverless_nuxt'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
  },
  target: 'node',
  externals: [
    'nuxt',
  ],
  stats: 'errors-only',
  plugins: [
    new CopyPlugin([
      { from: '.nuxt/dist/server', to: '.nuxt/dist/server' },
      { from: 'package.json', force: true },
    ]),
    new WebpackBarPlugin({
      name: 'Serverless',
      color: '#228be6',
    }),
  ],
};
