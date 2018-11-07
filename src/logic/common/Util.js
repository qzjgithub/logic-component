class Util {
    
    static LOGABLE = false;
    /**
     * 检查是否是undefined
     * @param obj
     */
    static isUndefined(object){
        return object === undefined;
    }

    /**
     * 检查是否是null
     * @param object
     * @returns {boolean}
     */
    static isNull(object){
        return object === null;
    }

    /**
     * 检查是否是string
     * @param object
     * @returns {boolean}
     */
    static isString(object){
        return typeof object === 'string';
    }

    /**
     * 是字符串且不是空字符串
     * @param object
     * @returns {boolean}
     */
    static isStringWithoutNull(object){
        return this.isString(object) && object != "";
    }

    /**
     * 检查是否是数组
     * @param object
     * @returns {boolean}
     */
    static isArray(object){
        if(object instanceof Array){
            return true;
        }else{
            Util.Console('error','object is not an Array');
            return false;
        }
    }

    /**
     * 检查是否是只保存了字符串的数组
     * @param object
     */
    static isArrayWithString(object){
        if(!this.isArray(object)) return false;
        for(let obj of new Set(object)){
            if(!this.isString(obj) || !obj){
                Util.Console('error','object inner has a element is not String');
                return false;
            }
        }
        return true;
    }

    /**
     * 是键值对对象
     * @param object
     * @returns {boolean}
     */
    static isKVObject(object){
        if(!this.isUndefined(object) && !this.isNull(object) && (object instanceof Object) && !(object instanceof Array)){
            return true;
        }else{
            Util.Console('error','object in not an object or is an Array');
            return false;
        }
    }

    /**
     * 是键值对对象且key是string
     * @param object
     * @returns {boolean}
     */
    static isKVObjectWithStringKey(object){
        if(!this.isKVObject(object)) return false;
        for(let key of Object.keys(object)){
            if(!this.isStringWithoutNull(key)){
                Util.Console('error','the object key is not a string or is ""');
                return false;
            }
        }
        return true;
    }

    /**
     * 将对象转换为map
     * @param object
     * @returns {Map<any, any>}
     */
    static objectToMap(object){
        let map = new Map();
        if(!this.isKVObjectWithStringKey(object)) return map;
        for(let key of Object.keys(object)){
            map.set(key, object[key]);
        }
        return map;
    }

    /**
     * 将map转换未对象
     * @param object
     */
    static mapToObject(object){
        if(object instanceof Map){
            let o = {};
            object.forEach((v,k) => {
                o[k] = v;
            });
        }else{
            return object;
        }
    }

    /**
     * 得到纯字符串的数组
     * @param object 可以是非空字符串和数组
     * @param reg 分割字符串的正则表达式
     */
    static getArrayWithString(object,reg){
        let clzArr = [];
        if(Util.isStringWithoutNull(object)){
            clzArr = object.split(' ');
        }else if(Util.isArrayWithString(object)){
            clzArr = object;
        }else{
            Util.Console('error','object is not an array or a string');
        }
        return clzArr;
    }

    /**
     * 将首字母大写
     * @param text
     * @constructor
     */
    static upFirstWord(text){
        if(Util.isStringWithoutNull(text) && new RegExp(/^[a-zA-Z].*$/).test(text)){
            return text[0].toUpperCase() + text.substring(1);
        }else{
            return text;
        }
    }

    /**
     * 打印开关
     * @param fun
     * @param param
     * @constructor
     */
    static Console(fun, ...param){
        if(!Util.LOGABLE){
            return;
        }
        console[fun](param);
    }
}

module.exports = Util;