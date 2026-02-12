const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./config-base');

module.exports = [
  merge(base[0], {
    mode: 'production',
  }),
]