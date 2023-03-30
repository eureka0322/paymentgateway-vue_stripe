const presetKarma = require('poi-preset-karma');
const webpack = require('webpack');
const glob = require('glob').sync;
const {name} = require('./package.json');

module.exports = {
  entry: glob('./src/**/*.vue'),
  filename: {
    js: name + '.min.js',
    css: name + '.min.css',
  },
  sourceMap: true,
  html: false,
  presets: [
    presetKarma({
      files: ['./test/specs/**.spec.js'],
      customLaunchers: {
        ChromeDebugging: {
          base: 'Chrome',
          flags: [ '--remote-debugging-port=9333' ]
        }
      },
      browsers: ['PhantomJS'/*, ChromeDebugging'*/],
      frameworks: ['mocha', 'chai', 'phantomjs-shim'],
      plugins: [
        'karma-chrome-launcher'
      ]
    })
  ],
  moduleName: 'GfPayments',
  transformModules: ['@paydock']
};
