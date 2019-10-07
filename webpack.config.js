const path = require('path');

const config =  {
  entry: './src/index.ts',
  devtool: 'hidden-source-map',
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
    config.devtool = 'inline-source-map';
  }

  return config;
};
