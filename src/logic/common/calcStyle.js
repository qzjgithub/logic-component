const HEX_RGB_REG = /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/;
const HEX_RGBA_REG = /^rgba\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\,(0|1|(0{0,1}\.[0-9]{1,2}))\)$/;
const DEC_COLOR_REG = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

let red = 255,green = 255,blue = 255;

const calcBorderColor = (baseColor) => {
    let decimal = 10;
    let result = DEC_COLOR_REG.exec(baseColor);
    if(!result){
        result = HEX_RGB_REG.exec(baseColor);
        decimal = 16;
    }

    if(!result){
        result = HEX_RGBA_REG.exec(baseColor)
    }

    if(result){
        switch(decimal){
            case 10:
                red = result[1];
                green = result[2];
                blue = result[3];
                break;
        }
    }
}
module.exports.calcBorderColor = calcBorderColor;