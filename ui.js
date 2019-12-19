'use strict'
const React = require('react')
const { useState } = require('react')
const { render, Box, Color, useInput, Text } = require('ink')
const TextInput = require('ink-text-input')
const SelectInput = require('ink-select-input')
const writeFile = require('./index')



const SearchQuery = () => {
  const [order_num, changeNum] = useState(1)
  const [logList, changeLogList] = useState([])
  const [content, changeContent] = useState('')
  useInput((input, key) => {
    if (input === 'q') {
      let result = ''
      logList.forEach((item, index) => {
        result += `\r\n\t\t${index + 1}. ${item}`
      })

      writeFile({
        content: result,
        url: './version.html'
      }).then(() => {
        process.exit()
      })
    }
    if (key.return) {
      // 按回车 换行 记录之前的输入

      changeNum(order_num + 1)

      changeLogList(() => {
        logList.push(content)
        return logList
      })
      changeContent('')
    }
  })
  return (
    <Box>
      <div>
        <Color white>请输入changelog内容 ：</Color>
        <Color green>回车换行，输入q退出</Color>
        <br />
        <div>
          {logList.map((item, index) => {
            return (
              <div key={index}>
                <Text>
                  {' '}
                  {index + 1}. {item}
                </Text>
                <br />
              </div>
            )
          })}
        </div>

        <Box>
          <span>{order_num}.</span>
          <TextInput.default
            value={content}
            onChange={value => {
              changeContent(value)
            }}
          />
        </Box>
      </div>
    </Box>
  )
}

module.exports = <SearchQuery />
