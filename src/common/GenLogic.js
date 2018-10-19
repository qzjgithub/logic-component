import Util from './Util';
import Status from './Status';
import Motivation from './Motivation';

class GenLogic{
    //状态集
    status;

    //状态值
    values;

    //自定义激励集
    motivation;

    constructor(object){
        this.status = new Map();
        this.values = new Map();
        this.motivation = new Map();
        if(Util.isKVObjectWithStringKey(object)){
            this.status = Util.objectToMap(object);
        }
        for(let key in this.status){
            let s = this.status.get(key);
            this.status.set(key, new Status(Util.isKVObject(s) ? s : {}));
            this.values.set(key, this.status.get(key).defaultState);
        }
    }

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
        if(Object.keys(status).length < 2){
            console.error("a motivation must be use at least two status.");
            return;
        }
        let s;
        for(let key in status){
            if(!this.status.has(key)){
                console.error(`has no status name ${key}.`);
                return;
            }
            s = this.status.get(key);
            if(s.getEventByKey(name) !== -1){
                console.error(`the motivation can not use status '${key}'`);
                return;
            }
        }

        this.motivation.set(name, new Motivation(status, trigger))
    }
}

module.exports = GenLogic;