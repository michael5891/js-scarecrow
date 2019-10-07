const path = require('path');

const config =  {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};


module.exports = (env, args) => {
  if (args.mode === 'development') {
    config.devtool = 'hidden-source-map';
  }

  return config;
};
