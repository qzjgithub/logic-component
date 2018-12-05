'use strict';

var fs = require('fs');
var path = require('path');
//RGB正则
var DEC_RGB_REG = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/;
//RGBA正则
var DEC_RGBA_REG = /^rgba\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\,(0|1|(0{0,1}\.[0-9]{1,2}))\)$/;
//十六进制表示颜色正则
var HEX_COLOR_REG = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
/**
 * 修正值可以是负数
 * @type {Array}
 */
var Config = {
    //基本色解析后三原色的十进制值
    baseColor: 'rgb(255,255,255)',
    baseRed: 49,
    baseGreen: 69,
    baseBlue: 82,
    baseOpacity: 1,
    colorDecimal: 10,
    //根据基本色得到边线色的修正值，分别是红、绿、蓝
    borderColorFactor: [-10, 120, 120, 0],
    shadowColorFactor: [-110, 130, 170, 0]
};

var writeStylus = function writeStylus(config, target) {
    var style = resolveConfig(config);
    var content = '';
    for (var key in style) {
        content += key + ' = ' + style[key] + '\n';
    }
    console.log(content);
    fs.writeFileSync(path.join(target, 'base.styl'), content);
};

/**
 * 解析config
 * @param config
 */
var resolveConfig = function resolveConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object.assign(Config, config);
    resolveBaseColor();
    var borderColor = calcColor(Config['borderColorFactor']);
    var shadowColor = calcColor(Config['shadowColorFactor']);
    return {
        baseColor: Config['baseColor'],
        borderColor: borderColor,
        shadowColor: shadowColor
    };
};

/**
 * 解析基本色
 * @param baseColor
 */
var resolveBaseColor = function resolveBaseColor() {
    var baseColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Config['baseColor'];

    var decimal = 16,
        baseOpacity = 1;
    var result = HEX_COLOR_REG.exec(baseColor);
    if (!result) {
        result = DEC_RGB_REG.exec(baseColor);
        decimal = 10;
    }

    if (!result) {
        result = DEC_RGBA_REG.exec(baseColor);
        baseOpacity = parseFloat(result[4]);
    }

    if (result) {
        Object.assign(Config, {
            baseRed: parseInt(result[1], decimal),
            baseGreen: parseInt(result[2], decimal),
            baseBlue: parseInt(result[3], decimal),
            baseOpacity: baseOpacity
        });
    }
};

/**
 * 根据参数计算颜色
 * @param factor
 */
var calcColor = function calcColor(factor) {
    var red = void 0,
        green = void 0,
        blue = void 0,
        opacity = void 0;
    red = calcPrimaryColor(Config['baseRed'] + factor[0]);
    green = calcPrimaryColor(Config['baseGreen'] + factor[1]);
    blue = calcPrimaryColor(Config['baseBlue'] + factor[2]);
    if (factor.length > 3) {
        opacity = Config['baseOpacity'] + factor[3];
    }
    return getColorByDecimal([red, green, blue, opacity], Config['colorDecimal']);
};

/**
 * 计算单色
 * @param colour
 */
var calcPrimaryColor = function calcPrimaryColor(colour) {
    colour = colour < 0 ? 0 : colour > 255 ? 255 : colour;
    return colour;
};

/**
 * 将十进制数组颜色转换成对应进制的颜色表示方式
 * @param colorArr
 * @param decimal
 */
var getColorByDecimal = function getColorByDecimal(colorArr, decimal) {
    var red = void 0,
        green = void 0,
        blue = void 0,
        opacity = void 0;
    red = colorArr[0].toString(decimal);
    green = colorArr[1].toString(decimal);
    blue = colorArr[2].toString(decimal);
    if (colorArr[3] != undefined) {
        opacity = parseFloat(colorArr[3]) || 1;
        opacity = opacity.toFixed(2);
    }
    var color = '';
    switch (decimal) {
        case 10:
            if (opacity != undefined) {
                color = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
            } else {
                color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            }
            break;
        case 16:
            color = '#' + red + green + blue;
    }
    return color;
};

module.exports.writeStylus = writeStylus;
module.exports.resolveConfig = resolveConfig;
module.exports.resolveBaseColor = resolveBaseColor;
module.exports.calcColor = calcColor;
module.exports.getColorByDecimal = getColorByDecimal;