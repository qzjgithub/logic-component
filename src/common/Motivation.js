import Util from './Util';

class Motivation{
    //状态集
    _status;

    //是否触发事件
    _trigger;

    constructor(object, trigger = false){
        this.coverStatus(object);
        this._trigger = !!trigger;
        this._object = object;
        this._trigger = trigger;
    }

    get trigger() {
        return this._trigger;
    }

    set trigger(value) {
        this._trigger = value;
    }

    coverStatus(object){
        this._status = new Map();
        if(Util.isKVObjectWithStringKey(object)){
            this._status = Util.objectToMap(object);
        }
        for(let key in this._status){
            this._status.set(key,!!this._status.get(key));
        }
    }

    setStatus(name, value = false){
        if(Util.isStringWithoutNull(name)){
            this._status.set(name, !!value);
        }
    }

    deleteStatus(name){
        if(Util.isStringWithoutNull(name) && this._status.has(name)){
            this._status.delete(name);
        }
    }

    clearStatus(){
        this._status.clear();
    }

    get status(){
        return this._status;
    }

}

module.exports = Motivation;