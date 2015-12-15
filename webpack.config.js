module.exports = {
  entry: "dist/app.es6.js",
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
}
