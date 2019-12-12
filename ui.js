'use strict';
const React = require('react');
const { render, Box, Color, UserInput } = require('ink');
const TextInput = require('ink-text-input');
const SelectInput = require('ink-select-input');
const writeFile = require('./index');

class SearchQuery extends React.Component {
	constructor() {
		super();

		this.state = {
			query: '',
			showInput: false
		};

		this.handleSelect = this.handleSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSelect(item) {
		this.setState({
			showInput: true
		})
	}

	render() {
		// const { showInput } = this.state;

		const items = [{
			label: '否',
			value: false
		}, {
			label: '是',
			value: true
		}];

		return (
			<div>
				{
					// showInput &&
					<div>
						<Color white>请输入changelog内容 ：</Color >
						<br />
						<TextInput.UncontrolledTextInput
							onSubmit={this.handleSubmit}
						/>
					</div>
				}
				{/* {
					!showInput && <div>
						<Color green>是否需要输入版本号和文件路径</Color>
						<br />
						<SelectInput.default items={items} onSelect={this.handleSelect} />
					</div>
				} */}
			</div>

		);
	}

	handleSubmit(v) {
		writeFile({
			content: v,
			url: './version.html'
		}).then(() => {
			process.exit();
		})
	}
}

module.exports = <SearchQuery />




