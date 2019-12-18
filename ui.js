'use strict'
const React = require('react')
const { useState } = require('react')
const { render, Box, Color, useInput } = require('ink')
const TextInput = require('ink-text-input')
const SelectInput = require('ink-select-input')
const writeFile = require('./index')

// class SearchQuery extends React.Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			query: '',
// 			showInput: false,
// 			order_number: 1,
// 		};

// 		this.handleSelect = this.handleSelect.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	handleSelect(item) {
// 		this.setState({
// 			showInput: true
// 		})
// 	}

// 	render() {
// 		// const { showInput } = this.state;

// 		const items = [{
// 			label: '否',
// 			value: false
// 		}, {
// 			label: '是',
// 			value: true
// 		}];

// 		return (
// 			<div>
// 				{
// 					// showInput &&
// 					<div>
// 						<Color white>请输入changelog内容 ：</Color >
// 						<br />
// 						{
// 							<TextInput.UncontrolledTextInput
// 							onSubmit={this.handleSubmit}
// 						/>
// 						}
// 					</div>
// 				}
// 				{/* {
// 					!showInput && <div>
// 						<Color green>是否需要输入版本号和文件路径</Color>
// 						<br />
// 						<SelectInput.default items={items} onSelect={this.handleSelect} />
// 					</div>
// 				} */}
// 			</div>

// 		);
// 	}

// 	handleSubmit(v) {
// 		writeFile({
// 			content: v,
// 			url: './version.html'
// 		}).then(() => {
// 			process.exit();
// 		})
// 	}
// }

// module.exports = <SearchQuery />

const SearchQuery = () => {
  const [order_num, changeNum] = useState(1)
  useInput((input, key) => {
    if (input === 'q') {
      console.log('退出吧')
    }
    if (key.return) {
	  // 按回车 换行 记录之前的输入

	  changeNum(order_num + 1)
    }
  })
  return (
    <Box>
      {
        <div>
          <Color white>请输入changelog内容 ：</Color>
          <br />
          {
            <Box>
              <span>{order_num}.</span>
              <TextInput.UncontrolledTextInput onSubmit={this.handleSubmit} />
            </Box>
          }
        </div>
      }
    </Box>
  )
}

module.exports = <SearchQuery />
