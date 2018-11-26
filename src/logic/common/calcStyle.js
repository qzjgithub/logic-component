const fs = require('fs');
const path = require('path');
//RGB正则
const DEC_RGB_REG = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/;
//RGBA正则
const DEC_RGBA_REG = /^rgba\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\,(0|1|(0{0,1}\.[0-9]{1,2}))\)$/;
//十六进制表示颜色正则
const HEX_COLOR_REG = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
/**
 * 修正值可以是负数，与基本色值作用如果小于0则用余数与255相加，大于255则取余
 * @type {Array}
 */
let Config = {
    //基本色解析后三原色的十进制值
    baseColor: 'rgb(255,255,255)',
    baseRed: 255,
    baseGreen: 255,
    baseBlue: 255,
    baseOpacity: 1,
    colorDecimal: 10,
    //根据基本色得到边线色的修正值，分别是红、绿、蓝
    borderColorFactor: [-10, 120, 120, 0]
};

const writeStylus = (config, target) => {
    let style = resolveConfig(config);
    let content = '';
    for(let key in style){
        content += `${key} = ${style[key]}\n`;
    }
    console.log(content);
    fs.writeFileSync(path.join(target,'base.styl'),content);
}

/**
 * 解析config
 * @param config
 */
const resolveConfig = (config = {}) => {
    Object.assign(Config,config);
    resolveBaseColor();
    let borderColor = calcBorderColor();
    return { baseColor: Config['baseColor'], borderColor };
}

/**
 * 解析基本色
 * @param baseColor
 */
const resolveBaseColor = (baseColor = Config['baseColor']) => {
    let decimal = 16,baseOpacity = 1;
    let result = HEX_COLOR_REG.exec(baseColor);
    if(!result){
        result = DEC_RGB_REG.exec(baseColor);
        decimal = 10;
    }

    if(!result){
        result = DEC_RGBA_REG.exec(baseColor)
        baseOpacity = parseFloat(result[4]);
    }

    if(result){
        Object.assign(Config,{
            baseRed : parseInt(result[1], decimal),
            baseGreen : parseInt(result[2], decimal),
            baseBlue : parseInt(result[3], decimal),
            baseOpacity: baseOpacity
        });
    }
}

/**
 * 计算边框颜色
 * @param factor
 */
const calcBorderColor = (factor = Config['borderColorFactor']) => {
    let red, green, blue, opacity;
    red = calcPrimaryColor(Config['baseRed'] + factor[0]);
    green = calcPrimaryColor(Config['baseGreen'] + factor[1]);
    blue = calcPrimaryColor(Config['baseBlue'] + factor[2]);
    if(factor.length > 3){
        opacity = Config['baseOpacity'] + factor[3];
    }
    return getColorByDecimal([red, green, blue, opacity],Config['colorDecimal']);
}

/**
 * 计算单色
 * @param colour
 */
const calcPrimaryColor = (colour)=>{
    colour = colour % 255;
    if(colour < 0){
        colour += 255;
    }
    return colour;
}

/**
 * 将十进制数组颜色转换成对应进制的颜色表示方式
 * @param colorArr
 * @param decimal
 */
const getColorByDecimal = (colorArr, decimal) => {
    let red , green, blue, opacity;
    red = colorArr[0].toString(decimal);
    green = colorArr[1].toString(decimal);
    blue = colorArr[2].toString(decimal);
    if(colorArr[3] != undefined){
        opacity = parseFloat(colorArr[3])||1;
        opacity = opacity.toFixed(2);
    }
    let color = '';
    switch(decimal){
        case 10:
            if(opacity != undefined){
                color = `rgba(${red},${green},${blue},${opacity})`;
            }else{
                color = `rgb(${red},${green},${blue})`;
            }
            break;
        case 16:
            color = `#${red}${green}${blue}`;
    }
    return color;
}

module.exports.writeStylus = writeStylus;
module.exports.resolveConfig = resolveConfig;
module.exports.resolveBaseColor = resolveBaseColor;
module.exports.calcBorderColor = calcBorderColor;
module.exports.getColorByDecimal = getColorByDecimal;