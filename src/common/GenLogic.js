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
            this.status.set(key, new Status(Util.isKVObject(s) ? s : {}));
            this.values.set(key, this.status.get(key).defaultState);
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
        if(Object.keys(status).length < 1){
            console.error("a motivation must be use at least two status.");
            return;
        }
        for(let key in status){
            if(!this.status.has(key)){
                console.error(`has no status name ${key}.`);
                return;
            }
        }

        this.motivation.set(name, new Motivation(status, trigger))
    }

    /**
     * 删除某个激励
     * @param name
     */
    deleteMotivation(name){}

    /**
     * 添加Status
     * @param name
     * @param object
     */
    addStatus(name,object){
        if(Util.isStringWithoutNull(name) && !this.status.has(name) && Util.isKVObjectWithStringKey(object)){
            this.status.set(name,new Status(object));
        }
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
        if(!this.motivation.has(motivation) || !this.status.has(status)){
            console.error(`have no motivation name ${motivation} or have no status name ${status}`);
            return;
        }
        let m = this.motivation.get(motivation);
        for(let sk of Object.keys(m.status)){
            if(sk===status){
                console.error(`the motivation ${motivation} contains the status ${status}`);
                return;
            }
        }
        let s = this.status.get(status);
        s.setMotivation(motivation,type);
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
        if(!this.motivation.has(motivation) || !this.status.has(status)){
            console.error(`have no motivation name ${motivation} or have no status name ${status}`);
            return;
        }
        this.status.get(status).deleteMotivation(motivation);
    }
}

module.exports = GenLogic;