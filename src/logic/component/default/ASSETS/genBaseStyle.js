const calcStyle = require('../../../common/calcStyle');
const styleConfig = require('./config.json').style;
console.log(styleConfig);
calcStyle.writeStylus(styleConfig,__dirname);