import Util from './Util';
import Status from './Status';
import Motivation from './Motivation';

class GenLogic{
    //状态集
    _status;

    //状态值
    _values;

    //自定义激励集
    _motivation;

    //motivation激活status的Map
    _activeStatus;

    constructor(object){
        this._status = new Map();
        this._values = new Map();
        this._motivation = new Map();
        this._activeStatus = new Map();
        if(Util.isKVObjectWithStringKey(object)){
            this._status = Util.objectToMap(object);
            this._status.forEach((s,key) => {
                this._status.set(key, new Status(Util.isKVObject(s) ? s : {}));
                this._values.set(key, this._status.get(key).defaultState);
            })
        }
    }

    /**
     * 添加激励
     * @param name
     * @param status
     * @param trigger
     */
    addMotivation(name, { status, trigger = false }){
        if(!Util.isStringWithoutNull(name)) {
            console.error("the name is not a string.");
            return;
        }
        if(this.motivation.has(name)){
            console.error(`motivation have the ${name}`);
            return;
        }
        if(!Util.isKVObjectWithStringKey(status)) {
            console.error("status for motivation is not a kv object with string.");
            return;
        }
        /*if(Object.keys(status).length < 1){
            console.error("a motivation must be use at least two status.");
            return;
        }*/
        for(let key in status){
            if(!this._status.has(key)){
                console.error(`has no status name ${key}.`);
                return;
            }
        }

        this._motivation.set(name, new Motivation(status, trigger));
    }

    /**
     * 删除某个激励
     * @param name
     */
    deleteMotivation(name){
        if(!Util.isStringWithoutNull(name) || !this.motivation.has(name)){
            console.log(`motivation name ${name} is not right`);
            return;
        }
        let sm;
        for(let key of Object.keys(this.status)){
            sm = this._status.get(key)._motivation;
            if(sm.has(name)){
                console.error(`has status contain motivation name ${name}`);
                return;
            }
        }
        this._motivation.delete(name);
    }

    /**
     * 添加Status
     * @param name
     * @param object
     */
    addStatus(name,object){
        if(Util.isStringWithoutNull(name) && !this.status.has(name) && Util.isKVObjectWithStringKey(object)){
            let s = new Status(object);
            this._status.set(name,s);
            this._values.set(name,s.defaultState);
        }
    }

    /**
     * 删掉某个status
     * @param name
     */
    deleteStatus(name){
        if(!Util.isStringWithoutNull(name) || !this._status.has(name)){
            console.error(`status name ${name} is not right`);
            return;
        }
        for(let key of this._motivation.keys()){
            if(this._motivation.get(key).status.has(name)){
                console.log(`has motivation judge by status named ${name}`);
                return;
            }
        }
        this._status.delete(name);
    }

    /**
     * 为某个status添加某个激励
     * @param motivation
     * @param status
     * @param type
     */
    setStatusMotivation(motivation, status, type){
        if(!Util.isStringWithoutNull(motivation) || !Util.isStringWithoutNull(status)) {
            console.error('motivation or status name not right.');
            return;
        }
        if(!this._motivation.has(motivation) || !this.status.has(status)){
            console.error(`have no motivation name ${motivation} or have no status name ${status}`);
            return;
        }
        let m = this._motivation.get(motivation);
        for(let sk of Object.keys(m.status)){
            if(sk===status){
                console.error(`the motivation ${motivation} contains the status ${status}`);
                return;
            }
        }
        let s = this._status.get(status);
        s.setMotivation(motivation,type);
        if(!this._activeStatus.has(motivation)){
            this._activeStatus.set(motivation,new Set());
        }
        this._activeStatus.get(motivation).add(status);
    }

    /**
     * 删掉某个status的motivation
     * @param motivation
     * @param status
     */
    deleteStatusMotivation(motivation, status){
        if(!Util.isStringWithoutNull(motivation) || !Util.isStringWithoutNull(status)) {
            console.error('motivation or status name not right.');
            return;
        }
        if(!this._motivation.has(motivation) || !this._status.has(status)){
            console.error(`have no motivation name ${motivation} or have no status name ${status}`);
            return;
        }
        this._status.get(status).deleteMotivation(motivation);
        this._activeStatus.get(motivation).delete(status);
    }


    get values() {
        return this._values;
    }

    set values(value) {
        this._values = value;
    }

    get motivation() {
        return this._motivation;
    }

    set motivation(value) {
        this._motivation = value;
    }

    get activeStatus() {
        return this._activeStatus;
    }

    set activeStatus(value) {
        this._activeStatus = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

module.exports = GenLogic;
export default GenLogic;