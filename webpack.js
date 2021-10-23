require('dotenv').config();

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, './bundle/'),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './static'),
      publicPath: '/static',
    },
    port: process.env.UI_PORT,
  },
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|test|server|get.property/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {
                    stage: 1,
                    features: { 'css-nesting': true },
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new DefinePlugin({
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
    }),
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, './src/api'),
      common: path.resolve(__dirname, './src/common/'),
      components: path.resolve(__dirname, './src/components/'),
      store: path.resolve(__dirname, './src/store/'),
      app: path.resolve(__dirname, './src/app.js'),
      observer: path.resolve(__dirname, './src/observer.js'),
    },
  },
};
