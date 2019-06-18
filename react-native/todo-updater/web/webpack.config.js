const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

 const appDirectory = path.resolve(__dirname, '../');

 const babelOptions = {
  cacheDirectory: false,
  babelrc: false,
  configFile: false,
  // The 'react-native' preset is recommended to match React Native's packager
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'dynamic-import-webpack',
    'relay',
    'react-native-web',
  ],
};

 const sourceConfig = {
  test: /\.jsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  exclude: [
    /node_modules/,
  ],
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
  ],
  use: {
    loader: 'babel-loader',
    options: { ...babelOptions },
  },
};

 const libraryConfig = {
  test: /\.jsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  exclude: [
    /node_modules\/react-native-web/,
  ],
  include: [
    /node_modules\/react-native-/,
    /node_modules\/react-navigation-/,
    /node_modules\/@react-navigation/,
    /node_modules\/react-native-vector-icons\/Fonts/,
  ],
  use: {
    loader: 'babel-loader',
    options: { ...babelOptions },
  },
};

 const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: '@svgr/webpack',
};
/*
const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [
    /node_modules\/react-native-vector-icons\/Fonts/,
    /assets\/fonts\/Open_Sans/,
    /assets\/fonts/,
  ],
};
*/

 // This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};


 // Handlebar loader
const handlebarLoaderConfiguration = {
  test: /\.hbs$/,
  loader: 'handlebars-loader',
};

const typescriptLoaderConfiguration = {
  test: /\.tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  exclude: [
    /node_modules/,
  ],
  include: [
    path.resolve(appDirectory, 'src'),
  ],
  use: {
    loader: 'ts-loader',
  },
};

 module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

   plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),

     // generates html for server side rendering
    new HtmlWebpackPlugin({
      title: 'Custom template',
      hash: true,
      template: 'web/public/index.html',
      output: {
        filename: 'index.html',
        path: path.resolve(appDirectory, 'web/dist'),
      },
    }),

     // to copy static assets
    new CopyWebpackPlugin([{
      from: 'web/public',
      to: 'web/dist',
    }]),
  ],

   // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'web/dist'),
  },

   // ...the rest of your config

   // devtool
  devtool: 'source-map',

   module: {
    rules: [
      sourceConfig,
      libraryConfig,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      handlebarLoaderConfiguration,
      typescriptLoaderConfiguration,
    ],
  },

   resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      'victory-native$': 'victory',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.tsx', '.ts','.js', '.json', '.jsx', '.web.jsx'],
  },
};