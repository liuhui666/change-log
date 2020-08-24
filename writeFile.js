const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');

/**
 *
 * @param {*} url
 * @param {*} version
 *
 * 往文件的固定的行写入数据：

需要用到时nodejs的fs模块和path模块

用到fs模块的方法 readFileSync & writeFileSync ； readFileSync 是读取文件内容， writeFileSync 是向文件写入内容；

实现思路：

1：读取文件内容并把读取到的内容以换行符切割成数组

2：向数组的插入内容（用splice向固定的下表插入内容）

3：把数组再转成字符串（使用join方法，join方法的参数也是换行符），然后转化后的字符串再写入原文件

（1）在微软的MS-DOS和Windows中，使用“回车CR('\r')”和“换行LF('\n')”两个字符作为换行符;
（2）Windows系统里面，每行结尾是 回车+换行(CR+LF)，即“\r\n”；
（3）Unix系统里，每行结尾只有 换行LF，即“\n”；
（4）Mac系统里，每行结尾是 回车CR 即'\r'。
Mac OS 9 以及之前的系统的换行符是 CR，从 Mac OS X （后来改名为“OS X”）开始的换行符是 LF即‘\n'，和Unix/Linux统一了。
 */


let v;
const platformLineBreakMap = {
  darwin: '\n', // Darwin 是一个由苹果公司(Apple Inc.)开发的 UNIX 操作系统。自2000年后,Darwin 是苹果所有操作系统的基础,包括 macOS(原名 Mac OS X ,后缩写为 OS X,至 WWDC 2016 改名为 macOS)、iOS、watchOS 和 tvOS。
  linux: '\n',
  win32: '\r\n',
};


const lineBreak = platformLineBreakMap[process.platform] || '\r\n';

const template = `<pre>${lineBreak}</pre>`;

function writeFile({ url, content }) {
  // 读文件
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, url), 'utf8', (err, data) => {
      if (!data) {
        // 如果是空文件，写自动写入<pre></pre>
        fs.writeFileSync(path.resolve(__dirname, url), template);
      }
      const newData = data || template;

      if (err) {
        reject(chalk.red.bold(`读取文件失败 ${lineBreak}${err}`));
      } else {
        // 版本号
        v = newData.match(/\d+\.\d+\.\d+/) ? newData.match(/\d+\.\d+\.\d+/)[0] : '0.0.0';
        const vArr = v.split('.');
        const bigVersion = vArr[0];
        const middleVersion = vArr[1];
        const smallVersion = vArr[2];
        let newVersion = '';
        if (smallVersion / 1 < 9) {
          newVersion = `${bigVersion}.${middleVersion}.${(smallVersion / 1) + 1}`;
        } else {
          if (middleVersion / 1 < 9) {
            newVersion = `${bigVersion}.${(middleVersion / 1) + 1}.${0}`;
          } else {
            newVersion = `${(bigVersion / 1) + 1}.${0}.${0}`;
          }
        }

        const fileData = newData.split(/\r\n|\n|\r/gm); // 按照每一行拆分的
        v = newVersion;
        // 找出pre标签
        let preIndex = 0; // 默认的<pre>标签是version的第一个标签

        fileData.some((ele, index) => {
          if (ele.indexOf('<pre>') > -1) {
            preIndex = index;
            return true;
          }
          return false;
        });

        fileData.splice(preIndex + 1, 0, '--------------------------------------------------------------------\n' +
					`version ${v}.${moment().format('YYYYMMDD')}${lineBreak}` +// eslint-disable-line
					'修改：' +// eslint-disable-line
					`${content}`// eslint-disable-line
				);// eslint-disable-line

        fs.writeFile(path.resolve(__dirname, url), fileData.join(lineBreak), (e) => {
          if (e) {
			console.log(chalk.red.bold(`写入文件失败 ${lineBreak}${e}`));// eslint-disable-line
            reject(err);
          } else {
			console.log(chalk.green.bold(`${url} 写入changelog成功`));// eslint-disable-line
            resolve();
          }
        });
      }
    });
  });
  return promise;
}

module.exports = writeFile;
