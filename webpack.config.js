const path = require('path');

module.exports = {
	mode: 'development',
	target: "node",
  entry: './cli.js',  // 程序入口
  output: {
    path: path.resolve(__dirname, 'dist'),   // 构建输出路径
    filename: 'cli.js',  // 构建输出的文件名
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'], // jsx转为js函数
				},

      },
    ],
	}
};
