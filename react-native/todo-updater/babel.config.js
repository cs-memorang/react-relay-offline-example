module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    '@svgr/babel-plugin-transform-react-native-svg',
    'relay',
  ],
};