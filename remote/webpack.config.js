const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
// TypeScript-Compiler + AOT

const path = require('path');
// const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  resolve: {
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      {test: /\.ts$/, loaders: ['@ngtools/webpack']},
      {test: /\.html$/, loader: 'html-loader', options: {minimize: true}},
      /*{
        test: /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "import": false
            }
          }
        ]
      },*/
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      }
    ]
  },
  plugins: [
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: './tsconfig.app.json',
      hostReplacementPaths: {
        './src/environments/environment.ts': './src/environments/environment.prod.ts'
      },
      entryModule: path.resolve(__dirname, './src/bor/bor.module#BorModule')
    })
  ],
  output: {
    path: __dirname + '/dist/remote',
    filename: 'main.bundle.js'
  },
  mode: 'production'
};
