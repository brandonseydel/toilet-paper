const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = "css-loader";

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')()
    ]
  }
};

module.exports = function(env) {
  const production = env === 'production' || process.env.NODE_ENV === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'entry-bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000,
      lazy: false
    },
    module: {
      rules: [
        {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader"},
        { test: /\.(scss|css)$/i, use: [ "style-loader", cssLoader, postcssLoader, { loader: "sass-loader", options: { sassOptions: { includePaths: ["node_modules"] } } } ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        { test: /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/ }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.ejs' })
    ]
  }
}