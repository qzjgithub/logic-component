class SequenceEvent {
    constructor(events){
        this.events = events || [];
    }

    async execute(...param){
        if(!this.events || !(this.events instanceof Array)){
            console.error("Events is not an Array");
            return;
        }
        for(let ind = 0; ind < this.events.length; ind++ ){
            param = await this.execOne(param,this.events[ind]);
        }
        return param;
    }

    async execOne(param, method){
        let result = null;
        if(method instanceof Function) {
            try{
                result = await method(...param);
            }catch (e){
                result = e;
            }
        }
        if(result !==null && !(result instanceof Array) && !(result instanceof Promise)){
            result = [ result ];
        }
        return result || param;
    }
}

module.exports = SequenceEvent;
export default SequenceEvent;