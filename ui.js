
const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Color, useInput, Text } = require('ink');
const TextInput = require('ink-text-input');
const writeFile = require('./writeFile.js');
const findFileDir = require('./findFile.js');

let versionFileDir = null;

const SearchQuery = () => {
  const [order_num, changeNum] = useState(1);
  const [logList, changeLogList] = useState([]);
  const [content, changeContent] = useState('');
  const [showContent, changeShowContent] = useState(false);

  useEffect(() => {
    findFileDir().then((dir) => {
      versionFileDir = dir;
      changeShowContent(true);
    }).catch(() => {
      process.exit();
    });
  }, []);// 第二个参数是空数组 相当于didMount

  useInput((input, key) => {
    if (key.escape) {
      if (!logList.length) return process.exit();
      let result = '';
      logList.forEach((item, index) => {
        result += `\r\n\t${index + 1}. ${item}`;
      });

      writeFile({
        content: result,
        url: versionFileDir,
      }).then(() => {
        process.exit();
      });
    }


    if (key.return) {
      if (!content) return;
      // 按回车 换行 记录之前的输入
      changeNum(order_num + 1);
      changeLogList(() => {
        logList.push(content);
        return logList;
      });
      changeContent('');
    }
  });
  return (
    <Box>
      {
        showContent ? <div>
          <Color white>请输入changelog内容 ：</Color>
          <Color green>回车换行提交，Esc退出</Color>
          <br />
          <div>
            {logList.map((item, index) => (
              <div key={index}>
                <Text>
                  {' '}
                  {index + 1}. {item}
                </Text>
                <br />
              </div>
            ))}
          </div>
          <Box>
            <span>{order_num}.</span>
            <TextInput.default
              value={content}
              onChange={(value) => {
                changeContent(value);
              }}
            />
          </Box>
        </div> : <Color red>请先创建version文件</Color>
      }
    </Box>
  );
};

module.exports = <SearchQuery />;
