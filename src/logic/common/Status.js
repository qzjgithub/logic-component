import Util from './Util';

class Status {

    static EVENT_VALUE = [0,1,2];

    static BASIC = Symbol('basic');

    //作用对象
    _target;
    //是否将状态绑定样式作用到Dom上,Boolean
    _styleToDom;
    //状态激活样式class,Array
    _classTrue;
    //状态未激活样式class
    _classFalse;
    //状态激活样式，覆盖class
    _styleTrue;
    //状态未激活样式，覆盖class
    _styleFalse;
    //状态默认激活状态
    _defaultState;
    //状态绑定的事件
    /**
     * 事件对应值会有不同响应
     * 0 表示总是响应为未激活,state变为false
     * 1 表中总是响应为激活,state变为true
     * 2 表示总是响应为相反状态，state变为!state
     *
     */
        // click: 0,//0,1,2
    _event;

    //自定义激励集
    _motivation;

    constructor({
        target,
        styleToDom = true, classTrue, classFalse, styleTrue, styleFalse,
        defaultState = false, event
                }){
        this._target = Util.isStringWithoutNull(target) ? target : Status.BASIC;
        this._styleToDom = !!styleToDom;
        this.coverClassTrue(classTrue);
        this.coverClassFalse(classFalse);
        this._styleTrue = Util.isKVObjectWithStringKey(styleTrue) ? styleTrue : {};
        this._styleFalse = Util.isKVObjectWithStringKey(styleFalse) ? styleFalse : {};

        this._defaultState = !!defaultState;
        this._event = this.coverEvent(event);
        this._motivation = new Map();
    }

    get styleToDom() {
        return this._styleToDom;
    }

    set styleToDom(value) {
        this._styleToDom = !!value;
    }

    get classTrue() {
        return this._classTrue;
    }

    get classFalse() {
        return this._classFalse;
    }

    get styleTrue() {
        return this._styleTrue;
    }

    get styleFalse() {
        return this._styleFalse;
    }

    get defaultState() {
        return this._defaultState;
    }

    set defaultState(value) {
        this._defaultState = !!value;
    }

    get event() {
        return this._event;
    }

    get motivation(){
        return this._motivation;
    }


    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }

    /**
     * 添加classTrue
     * @param clazzs
     */
    addClassTrue(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        for(let clz of clzArr){
            this._classTrue.add(clz);
        }
    }

    /**
     * 覆盖classTrue
     * @param clazzs
     */
    coverClassTrue(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        this._classTrue = new Set(clzArr);
    }

    /**
     * 移除classTrue
     * @param clazzs
     */
    removeClassTrue(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        for(let clz of clzArr){
            this._classTrue.delete(clz);
        }
    }

    /**
     * 清空classTrue
     */
    clearClassTrue(){
        this._classTrue.clear();
    }

    /**
     * 添加classFalse
     * @param clazzs
     */
    addClassFalse(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        for(let clz of clzArr){
            this._classFalse.add(clz);
        }
    }

    /**
     * 覆盖classFalse
     * @param clazzs
     */
    coverClassFalse(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        this._classFalse = new Set(clzArr);
    }

    /**
     * 移除classFalse
     * @param clazzs
     */
    removeClassFalse(clazzs){
        let clzArr = Util.getArrayWithString(clazzs);
        for(let clz of clzArr){
            this._classFalse.delete(clz);
        }
    }

    /**
     * 清空classFalse
     */
    clearClassFalse(){
        this._classFalse.clear();
    }

    /**
     * 清空所有class
     */
    clearClass(){
        this.clearClassTrue();
        this.clearClassFalse();
    }

    /**
     * 合入styleTrue
     * @param styles
     */
    mergeStyleTrue(styles){
        if(Util.isKVObjectWithStringKey(styles)){
            for(let key in Object.keys(styles)){
                this._styleTrue.set(key, styles[key]);
            }
        }
    }

    /**
     * 覆盖styleTrue
     * @param styles
     */
    coverStyleTrue(styles){
        if(Util.isKVObjectWithStringKey(styles)){
            this._styleTrue = Util.objectToMap(styles);
        }
    }

    /**
     * 清空styleTrue
     */
    clearStyleTrue(){
        this._styleTrue.clear();
    }

    /**
     * 合入styleFalse
     * @param styles
     */
    mergeStyleFalse(styles){
        if(Util.isKVObjectWithStringKey(styles)){
            for(let key in Object.keys(styles)){
                this._styleFalse.set(key, styles[key]);
            }
        }
    }

    /**
     * 覆盖styleFalse
     * @param styles
     */
    coverStyleFalse(styles){
        if(Util.isKVObjectWithStringKey(styles)){
            this._styleFalse = Util.objectToMap(styles);
        }
    }

    /**
     * 清空styleFalse
     */
    clearStyleFalse(){
        this._styleFalse.clear();
    }

    /**
     * 清空所有style
     */
    clearStyle(){
        this.clearStyleTrue();
        this.clearStyleFalse();
    }

    /**
     * 是否存在EVNET_VALUE中
     * @param value
     * @returns {boolean}
     */
    inev(value){
        if(Status.EVENT_VALUE.indexOf(value) > -1){
            return true;
        }else if(typeof value === 'function'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 重置event
     * @param event
     * @returns {Map<any, any>|*}
     */
    coverEvent(event){
        event = Util.objectToMap(event);
        for(let key in event){
            if(!this.inev(event)){
                console.log("has event value not in [0,1,2]");
                event.delete(key);
            }
        }
        return event;
    }

    /**
     * 增加一个event
     * @param event
     * @param type
     */
    setEvent(event, type){
        if(Util.isStringWithoutNull(event) && this.inev(type)){
            this._event.set(event,type);
        }
    }

    /**
     * 移除一个event
     * @param event
     */
    deleteEvent(event){
        if(Util.isStringWithoutNull(event) && this._event.has(event)){
            this._event.delete(event);
        }
    }

    /**
     * 清空event
     */
    clearEvent(){
        this._event.clear();
    }


    /**
     * 得到一个event
     * @param event
     * @returns {*}
     */
    getEventByKey(event){
        if(!Util.isStringWithoutNull(event) || !this._event.has(event)){
            return -1;
        }else{
            return this._event.get(event);
        }
    }

    /**
     * 设置一个motivation
     * @param motivation
     * @param type
     */
    setMotivation(motivation, type){
        if(Util.isStringWithoutNull(motivation) && this.inev(type)){
            this.motivation.set(motivation,type);
        }
    }

    /**
     * 删除一个motivation
     * @param motivation
     */
    deleteMotivation(motivation){
        if(Util.isStringWithoutNull(motivation) && this._motivation.has(motivation)){
            this._motivation.delete(motivation);
        }
    }

    /**
     * 清空motivation
     */
    clearMotivation(){
        this._motivation.clear();
    }

    /**
     * 得到一个motivation的值
     * @param motivation
     * @returns {*}
     */
    getMotivationBykey(motivation){
        if(Util.isStringWithoutNull(motivation) && this._motivation.has(motivation)){
            return this._motivation.get(motivation);
        }else{
            return -1;
        }
    }
}

export default Status;