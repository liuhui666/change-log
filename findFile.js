const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

var ignoreDir = ['.git', 'node_modules'];//不必遍历的文件夹
var targetDir = null; //目标文件地址，即version文件地址

function loopFind(filedir) {

	var mainPath = filedir || path.resolve('./'); //当前目录
	// 从当前目录开始 遍历查找version.html文件,使用同步方法
	var files = fs.readdirSync(mainPath);
	files.some(function (filename) {
		if(targetDir) return true
		var filedir = path.join(mainPath, filename);
		var fileStats = fs.statSync(filedir)
		var isFile = fileStats.isFile();//是文件
		var isDir = fileStats.isDirectory();//是文件夹
		if (isFile) {
			// 为了兼容 大小写version名和 不同格式文件
			if (filename.toLowerCase().indexOf('version') > -1) {
				targetDir = filedir
			}
		}
		if (isDir) {
			if (ignoreDir.indexOf(filename) == -1) {
				// 继续遍历文件夹
				loopFind(filedir)
			}
		}
	})
	return targetDir
}
function findFileDir(filedir) {
	// 读文件
	const promise = new Promise((resolve, reject) => {
		const res = loopFind(filedir);
		if (res) {
			resolve(res)
		} else {
			reject(chalk.red.bold(`请创建version文件`));
		}
	})
	return promise;
}

module.exports = findFileDir;
