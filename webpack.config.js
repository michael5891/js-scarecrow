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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};


module.exports = (env, args) => {
  if (args.mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
};
