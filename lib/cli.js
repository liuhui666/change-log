#!/usr/bin/env node
const importJsx = require('import-jsx');

const {
  render,
} = require('ink');

const ui = importJsx('./ui');
render(ui);
