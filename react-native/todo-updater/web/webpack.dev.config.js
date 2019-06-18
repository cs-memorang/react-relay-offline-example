const path = require('path');
const config = require('./webpack.config');

 config.mode = 'development';
config.devServer = {
  contentBase: [path.join(__dirname, 'public')],
  historyApiFallback: true,
};

 module.exports = config;