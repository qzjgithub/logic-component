'use strict';

var calcStyle = require('../../../common/calcStyle');
var styleConfig = require('./config.json').style;
console.log(styleConfig);
calcStyle.writeStylus(styleConfig, __dirname);