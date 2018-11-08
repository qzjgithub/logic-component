import React from 'react';
import logical from '../../../common/logical';
import comcfg from '../ASSETS/config.json';

export default (WrappedComponent, logic, config) => {
    config = Object.assign({},comcfg,config);

    let logicBone = logical(WrappedComponent, logic, config);

    return class extends logicBone {
        constructor(props, context){
            super(props,context);
        }

        componentDidMount(){
            if(super.componentDidMount){
                super.componentDidMount();
            }
            if(this.config['i18n']=='public'){
                let that = this;
                try{
                    window['require'](['../ASSETS/i18n/'+config['language']],function(i18n){
                        if(!window['i18n']){
                            window['i18n'] = {}
                        }
                        window['i18n'] = Object.assign(window['i18n'],i18n);
                        if(that['onI18n']){
                            that['onI18n'].call(that,i18n);
                        }
                        that.setState({
                            i18n: i18n[config.name]
                        });
                    });
                }catch(e){
                    console.log(e);
                }
            }
        }
    };
}