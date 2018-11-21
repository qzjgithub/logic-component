const HEX_RGB_REG = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/;
const HEX_RGBA_REG = /^rgba\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\,(0|1|(0{0,1}\.[0-9]{1,2}))\)$/;
const DEC_COLOR_REG = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

const calcBorderColor = (baseColor) => {
    let decimal = 10;
    let result = HEX_RGB_REG(baseColor);
    if(result){

    }
}
module.exports.calcBorderColor = calcBorderColor;