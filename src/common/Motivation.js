import Util from './Util';

class Motivation{
    //状态集
    status;

    //是否触发事件
    trigger;

    constructor(object, trigger = false){
        this.coverStatus(object);
        this.trigger = !!trigger;
    }

    coverStatus(object){
        this.status = new Map();
        if(Util.isKVObjectWithStringKey(object)){
            this.status = Util.objectToMap(object);
        }
        for(let key in this.status){
            this.status.set(key,!!this.status.get(key));
        }
    }

    setStatus(name, value = false){
        if(Util.isStringWithoutNull(name)){
            this.status.set(name, !!value);
        }
    }

    deleteStatus(name){
        if(Util.isStringWithoutNull(name) && this.status.has(name)){
            this.status.delete(name);
        }
    }

    clearStatus(){
        this.status.clear();
    }


}

module.exports = Motivation;