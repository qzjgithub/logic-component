class NestedEvent {

    constructor(before,action,after){
        this.before = before;
        this.action = action;
        this.after = after;
    }

    async execute(...param){
        return await this.execOne(
            await this.execOne(
                await this.execOne(param,this.before),
                this.action),
            this.after);
    }

    async execOne(param, method){
        let result = null;
        if(method instanceof NestedEvent){
            result = method.execute(...param);
        }else if(method instanceof Promise){
            result = await method(...param);
        }else if(method instanceof Function) {
            result = method(...param);
        }
        return result || param;
    }
}

module.exports = NestedEvent;