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
 */
function writeFile(url, version) {
    // 读文件
    var promise = new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, url), 'utf8', (err, data) => {
            if (err) {
                reject(chalk.red.bold('读取文件失败 \n' + err))
            } else {

                var v = data.match(/\d+\.\d+\.\d+/)[0];
                var vArr = v.split('.');
                var bigVersion = vArr[0];
                var middleVersion = vArr[1];
                var smallVersion = vArr[2];
                var newVersion = '';
                if (smallVersion / 1 < 9) {
                    newVersion = `${bigVersion}.${middleVersion}.${smallVersion / 1 + 1}`
                } else {
                    if (middleVersion / 1 < 9) {
                        newVersion = `${bigVersion}.${middleVersion / 1 + 1}.${0}`
                    } else {
                        newVersion = `${bigVersion / 1 + 1}.${0}.${0}`
                    }
                }

                var file = data.split(/\r\n|\n|\r/gm);
                var v = version || newVersion;
                file.splice(1, 0, "\t--------------------------------------------------------------------" +
                    `\r\n\tversion ${v}.${moment().format('YYYYMMDD')}` +
                    "\r\n\t修改：" +
                    "\r\n\t\t命令行输入的内容" +
                    "\r\n"
                );

                fs.writeFile(path.resolve(__dirname, url), file.join('\r\n'), err => {
                    if (err) {
                        reject(chalk.red.bold('写入文件失败 \n' + err))
                    } else {
                        console.log(chalk.green.bold(url + ' 写入changelog成功'));
                        resolve(true)
                    }
                })
            }
        })
    })
    return promise
}

writeFile('./version.html').then((res) => { console.log(res) })
console.log(moment().format('YYYYMMDD'))
