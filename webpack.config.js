const path = require('path');

module.exports = {
  entry: './ui.js',  // 程序入口
  output: {
    path: path.resolve(__dirname, 'dist'),   // 构建输出路径
    filename: 'cli.js',  // 构建输出的文件名
  },
};
