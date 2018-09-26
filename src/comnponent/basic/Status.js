import Util from '../../common/util';

class Status {
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

    constructor({
        styleToDom, classTrue, classFalse, styleTrue, styleFalse,
        defaultState, event
                }){
        this._styleToDom = Util.isUndefined(styleToDom) ? true : !!styleToDom;
        this._classTrue = Util.getArrayWithString(classTrue);
        this._classFalse = Util.getArrayWithString(classFalse);
        this._styleTrue = Util.objectToMap(styleTrue);
        this._styleFalse = Util.objectToMap(styleFalse);
        this._defaultState = Util.isUndefined(styleToDom) ? true : !!styleToDom;
        this._event = event || {};
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

    set event(value) {
        this._event = value || {};
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

    addEvent(event, type){
    }

    removeEvent(event){

    }

    clearEvent(){}
}

export default Status;