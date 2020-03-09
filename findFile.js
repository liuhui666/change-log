const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ignoreDir = ['.git', 'node_modules', 'public', 'assets'];// 不必遍历的文件夹
let targetDir = null; // 目标文件地址，即version文件地址

function loopFind(mainFiledir) {
  const mainPath = mainFiledir || path.resolve('./'); // 当前目录
  // 从当前目录开始 遍历查找version.html文件,使用同步方法
  const files = fs.readdirSync(mainPath);
  files.some((filename) => {
    if (targetDir) return true;
    const filedir = path.join(mainPath, filename);
    const fileStats = fs.statSync(filedir);
    const isFile = fileStats.isFile();// 是文件
    const isDir = fileStats.isDirectory();// 是文件夹
    if (isFile) {
      // 为了兼容 大小写version名和 不同格式文件
      if (filename.toLowerCase().indexOf('version') > -1) {
        targetDir = filedir;
      }
    }
    if (isDir) {
      if (ignoreDir.indexOf(filename) === -1) {
        // 继续遍历文件夹
        loopFind(filedir);
      }
    }
  });
  return targetDir;
}
function findFileDir(filedir) {
  // 读文件
  const promise = new Promise((resolve, reject) => {
    const res = loopFind(filedir);
    if (res) {
      resolve(res);
    } else {
      reject(chalk.red.bold('请创建version文件'));
    }
  });
  return promise;
}

module.exports = findFileDir;
