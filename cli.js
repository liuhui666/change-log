#!/usr/bin/env node

const React = require('react');// eslint-disable-line no-unused-vars
const importJsx = require('import-jsx');
const { render } = require('ink');

const ui = importJsx('./ui');

render(ui);
