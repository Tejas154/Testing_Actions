const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: require.resolve('node-libs-browser/mock/empty'),
      path: require.resolve('path-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify")
    },
  },
  mode: 'production',
};
