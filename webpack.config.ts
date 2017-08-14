import * as webpack from "webpack";
import * as path from "path";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const IS_PROD = process.env.NODE_ENV === "production";

let config: webpack.Configuration = {
  entry: {
    app: [path.resolve(__dirname, "src/app.tsx")]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.vue$/,
        loader: "eslint-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", "vue", "json"]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true
    })
  ]
};

if (!IS_PROD) {
  config = {
    ...config,
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      host: "0.0.0.0",
      port: 3000,
      historyApiFallback: true, // 任意的 404 响应都替代为 index.html
      hot: true, // 启用 webpack 的模块热替换特性
      inline: true // 启用内联模式
    },
    plugins: [...config.plugins, new webpack.HotModuleReplacementPlugin()]
  };
} else {
  config = {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          warnings: false
        }
      })
    ]
  };
}

export default config;
