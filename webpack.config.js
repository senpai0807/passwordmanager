import webpack from 'webpack';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import nodeExternals from 'webpack-node-externals';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

const electronConfig = {
  entry: './src/main/main.js',
  name: 'electron',
  target: 'electron-main',
  resolve: {
    extensions: [".*",".js",".json"],
  },
  output: {
    path: join(__dirname, '/build'),
    publicPath: '/',
    filename: 'app.js',
    chunkFormat: 'module',
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  plugins: []
};

const preloadConfig = {
  entry: './src/preload/preload.mjs',
  target: 'electron-preload',
  output: {
    path: join(__dirname, '/build'),
    filename: 'preload.mjs',
    chunkFormat: 'module',
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

const reactConfig = {
  entry: './src/renderer/index.js',
  name: 'react',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: [".*",".js",".jsx",".json",".css",".svg"],
  },
  output: {
    path: join(__dirname, '/build'),
    publicPath: './',
    filename: 'bundle.js',
    module: true,
    chunkFormat: 'module',
  },
  devServer: {
    static: {
      directory: join(__dirname, '/build/'),
    },
    compress: true
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'src/renderer/index.html'
    }),
    new webpack.DefinePlugin({
      global: 'window'
    })
  ]
};

export default [electronConfig, reactConfig, preloadConfig];