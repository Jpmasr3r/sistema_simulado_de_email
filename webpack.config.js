const path = require("path");

module.exports = {
  entry: {
    login: "./src/js/login.js",
    createAccount: "./src/js/createAccount.js",
    main: "./src/js/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
