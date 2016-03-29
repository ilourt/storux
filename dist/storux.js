/*! storux v0.6.0 | MIT (c) 2016 Nicolas Tallefourtane - https://github.com/Nicolab/storux */!function(e,a){for(var i in a)e[i]=a[i]}(exports,function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Evemit=__webpack_require__(4),Store=__webpack_require__(2),Scope=__webpack_require__(1),_require=__webpack_require__(3),_isStore=_require.isStore,getStoreProtoProps=_require.getStoreProtoProps;if(!WeakMap)throw new Error("WeakMap is not supported by this browser. Please use a polyfill (see the Storux doc).");var Storux=function(){function Storux(){_classCallCheck(this,Storux),this.stores={},this.lifecycle=new Evemit,this._actionHandlersMap=new WeakMap,this._actionHandlerListenersMap=new WeakMap}return _createClass(Storux,null,[{key:"isStore",value:function(value){return _isStore(value)}},{key:"mountActionsResolver",value:function(store){var props=getStoreProtoProps(store).concat(Object.keys(store)),notActions=store.scope.opt.notActions,regNotActions=new RegExp(notActions.join("|")),_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=props[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var prop=_step.value;"function"!=typeof store[prop]||store[prop].id||regNotActions.test(prop)||store.scope.mountAction(prop)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator["return"]&&_iterator["return"]()}finally{if(_didIteratorError)throw _iteratorError}}}}]),_createClass(Storux,[{key:"beforeAction",value:function(action,listener,thisScope){return this.lifecycle.on("beforeAction."+action.displayName,listener,thisScope),this}},{key:"afterAction",value:function(action,listener,thisScope){return this.lifecycle.on("afterAction."+action.displayName,listener,thisScope),this}},{key:"beforeActions",value:function(listener,thisScope){return this.lifecycle.on("beforeActions",listener,thisScope),this}},{key:"afterActions",value:function(listener,thisScope){return this.lifecycle.on("afterActions",listener,thisScope),this}},{key:"createStore",value:function(StoruxStore){var opt=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],storeName=void 0,store=void 0;if(opt.mountActionsResolver||(opt.mountActionsResolver=Storux.mountActionsResolver),opt.notActions||(opt.notActions=Storux.notActions.slice()),opt.storux=this,store=new StoruxStore(opt),!_isStore(store))throw new TypeError("Storux.createStore() - `store` argument must be an instance of `Store`");if(storeName=store.scope.displayName,this.stores[storeName])throw new Error("The store `"+storeName+"` is already defined in the `Storux` instance.");return Object.defineProperty(this.stores,storeName,{enumerable:!0,configurable:!1,writable:!1,value:store}),this.lifecycle.emit("createStore",this.stores[storeName]),this.lifecycle.emit("createStore."+storeName,this.stores[storeName]),Storux.removeScopePropsAfterCreation.forEach(function(prop){store.scope[prop]=void 0}),store.scope.lifecycle.emit("init"),this.stores[storeName]}}]),Storux}();Storux.notActions=["^on","^handle","^_","^constructor$","^getState$","^getPrevState$","^setState$","^mergeState$"],Storux.removeScopePropsAfterCreation=["generateActions","mountAction","mountActions"],module.exports={Storux:Storux,Store:Store,Scope:Scope,Evemit:Evemit}},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Evemit=__webpack_require__(4),_require=__webpack_require__(3),clone=_require.clone,isEquival=_require.isEquival,isStore=_require.isStore,getStoreProtoProps=_require.getStoreProtoProps,getFuncName=_require.getFuncName,defineDisplayName=_require.defineDisplayName,generateStoreName=_require.generateStoreName,handlerNameToActionName=_require.handlerNameToActionName,_privateMap=new WeakMap,Scope=function(){function Scope(_ref){var _this=this,store=_ref.store,opt=_ref.opt;_classCallCheck(this,Scope);var _private=void 0;this.storux=opt.storux,opt.storux=null,this.opt=opt,this.store=store,this.actionsStack=[],this.changeListeners=[],this.lifecycle=new Evemit,this.initialState=this.opt.initialState||{},defineDisplayName(this,generateStoreName(this.store)),_private=_privateMap.set(this,{currentAction:null,actionsQueue:0,prevState:{},state:this.initialState}).get(this),this.lifecycle.once("init",function(){_private.state=_this.initialState})}return _createClass(Scope,[{key:"beforeAction",value:function(action,listener,thisScope){return this.storux.lifecycle.on("beforeAction."+action.displayName,listener,thisScope),this}},{key:"afterAction",value:function(action,listener,thisScope){return this.storux.lifecycle.on("afterAction."+action.displayName,listener,thisScope),this}},{key:"bindAction",value:function(action,handler){var actionHandlers=void 0,handlerName=getFuncName(handler),actionHandlersMap=this.storux._actionHandlersMap;if(!this.store[action.displayName]||this.store[action.displayName]!==action||!this.store[handlerName]||this.store[handlerName]!==handler)throw new Error(handlerName+" cannot bind the action ("+action.id+') from another store. Use instead the method "store.scope.afterAction()". See the doc.');return actionHandlers=actionHandlersMap.get(action),actionHandlers||(actionHandlers=actionHandlersMap.set(action,[]).get(action)),actionHandlers.push(handler),this}},{key:"bindActions",value:function(list){if(isStore(list))return this.bindStoreActions(list);for(var handlerName in list){var actions=list[handlerName],actionHandler=this[handlerName];if(Array.isArray(actions))for(var i=0,ln=actions.length;ln>i;i++)this.bindAction(actions[i],actionHandler);else this.bindAction(actions,actionHandler)}return this}},{key:"bindStoreActions",value:function(store){var props=getStoreProtoProps(store),_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=props[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var prop=_step.value;if("function"==typeof store[prop]&&0===prop.indexOf("on")){var actionName=handlerNameToActionName(prop),action=store[actionName];action&&this.bindAction(action,store[prop])}}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator["return"]&&_iterator["return"]()}finally{if(_didIteratorError)throw _iteratorError}}return this}},{key:"bindActionHandler",value:function(actionHandler,listener){var _actionHandlerListenersMap=this.storux._actionHandlerListenersMap,_actionHandlerListeners=_actionHandlerListenersMap.get(actionHandler);return _actionHandlerListeners||(_actionHandlerListeners=_actionHandlerListenersMap.set(actionHandler,[]).get(actionHandler)),_actionHandlerListeners.push(listener),this}},{key:"generateActions",value:function(){for(var store=this.store,i=0,ln=arguments.length;ln>i;i++){var actionName=arguments[i];if(store[actionName])throw new Error("generateActions(): "+actionName+"is already defined.");store[actionName]=function(dispatch,payload){return dispatch(payload),payload}}return this}},{key:"ensureActions",value:function(){for(var store=this.store,i=0,ln=arguments.length;ln>i;i++){var actionName=arguments[i];store[actionName]||(store[actionName]=function(dispatch,payload){return dispatch(payload),payload})}return this}},{key:"notActions",value:function(actionName){var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=arguments[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var name=_step2.value;this.opt.notActions.push("^"+name.trim()+"$")}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2["return"]&&_iterator2["return"]()}finally{if(_didIteratorError2)throw _iteratorError2}}return this}},{key:"mountAction",value:function(actionName){var _this2=this,_private=void 0;if(this.store[actionName]&&this.store[actionName].id)return this;_private=_privateMap.get(this);var fn=this.store[actionName],action=function action(){for(var _len=arguments.length,actionArgs=Array(_len),_key=0;_len>_key;_key++)actionArgs[_key]=arguments[_key];return new Promise(function(resolve,reject){_this2.actionsStack.push({proceed:function(){var _this3=this;_private.actionsQueue++,_private.currentAction=action.id+"#"+_private.actionsQueue,actionArgs=actionArgs.slice(),this.storux.lifecycle.emit("beforeAction."+action.displayName,actionArgs),this.storux.lifecycle.emit("beforeActions",{actionId:action.id,actionName:action.displayName,actionArgs:actionArgs}),actionArgs.unshift(function(payload){return _this3._dispatchAction({action:action,payload:payload}).then(function(hasChanged){return resolve(fnResult),_private.actionsQueue--,_private.currentAction=null,_this3.storux.lifecycle.emit("afterAction."+action.displayName,payload,fnResult,hasChanged),_this3.storux.lifecycle.emit("afterActions",{actionId:action.id,actionName:action.displayName,result:fnResult,payload:payload,hasChanged:hasChanged}),_this3._next(),hasChanged})["catch"](function(err){throw reject(err),err})});var fnResult=fn.apply(this.store,actionArgs)}}),1===_this2.actionsStack.length&&_this2._next()})["catch"](function(err){throw err})};return defineDisplayName(action,actionName),action.id=this.displayName+"."+action.displayName,action.defer=function(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_len2>_key2;_key2++)args[_key2]=arguments[_key2];return setTimeout(action.apply(_this2.store,args),0)},this.store[actionName]=action,this}},{key:"mountActions",value:function(){if(arguments.length){var _iteratorNormalCompletion3=!0,_didIteratorError3=!1,_iteratorError3=void 0;try{for(var _step3,_iterator3=arguments[Symbol.iterator]();!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=!0){var name=_step3.value;this.mountAction(name)}}catch(err){_didIteratorError3=!0,_iteratorError3=err}finally{try{!_iteratorNormalCompletion3&&_iterator3["return"]&&_iterator3["return"]()}finally{if(_didIteratorError3)throw _iteratorError3}}}else this.opt.mountActionsResolver(this.store);return this}},{key:"_next",value:function(){return this.actionsStack.length&&!_privateMap.get(this).currentAction?(this.actionsStack.shift().proceed.call(this),!0):!1}},{key:"getHandlerArgs",value:function(_ref2){var action=_ref2.action,payload=_ref2.payload,nextState=_ref2.nextState;return[payload,{actionId:action.id,actionName:action.displayName,nextState:nextState}]}},{key:"callActionHandler",value:function(_ref3){var action=_ref3.action,actionHandler=_ref3.actionHandler,payload=_ref3.payload,nextState=_ref3.nextState,nextStateUpdated=actionHandler.apply(this.store,this.getHandlerArgs({action:action,payload:payload,nextState:nextState}));if(!nextStateUpdated||"object"!==("undefined"==typeof nextStateUpdated?"undefined":_typeof(nextStateUpdated)))throw new TypeError('The handler "'+getFuncName(actionHandler)+'" should return the next state for the action '+action.id);return nextStateUpdated}},{key:"reduceActionHandlers",value:function(actionHandlers,action,payload){var nextState=void 0,_actionHandlerListenersMap=this.storux._actionHandlerListenersMap;nextState=this.getState();for(var i=0,ln=actionHandlers.length;ln>i;i++){var actionHandler=actionHandlers[i],_nextState=this.callActionHandler({action:action,actionHandler:actionHandler,payload:payload,nextState:nextState});if(_nextState&&"object"===("undefined"==typeof _nextState?"undefined":_typeof(_nextState))){var listeners=_actionHandlerListenersMap.get(actionHandler);if(nextState=_nextState,listeners&&listeners.length)for(var _i=0,_ln=listeners.length;_ln>_i;_i++)listeners[_i].apply(null,this.getHandlerArgs({action:action,payload:payload,nextState:nextState}))}}return this.setState(nextState)}},{key:"_dispatchAction",value:function(_ref4){var action=_ref4.action,payload=_ref4.payload,actionHandlers=this.storux._actionHandlersMap.get(action);return actionHandlers&&actionHandlers.length?Promise.resolve(this.reduceActionHandlers(actionHandlers,action,payload)):Promise.resolve(!1)}},{key:"listen",value:function(listener){var _this4=this;return this.changeListeners.push(listener),this.lifecycle.emit("listen",listener),function(){return _this4.unlisten(listener)}}},{key:"unlisten",value:function(listener){var changeListeners=this.changeListeners,i=changeListeners.indexOf(listener);return-1===i?!1:(changeListeners.splice(i,1),this.lifecycle.emit("unlisten",listener),!0)}},{key:"getState",value:function(){return clone({},_privateMap.get(this).state)}},{key:"getPrevState",value:function(){return clone({},_privateMap.get(this).prevState)}},{key:"setState",value:function(){var nextState=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],changeListeners=this.changeListeners,ln=changeListeners.length,_private=_privateMap.get(this);if(isEquival(_private.state,nextState))return!1;if(_private.prevState=_private.state,_private.state=clone({},nextState),ln)for(var i=0;ln>i;i++)changeListeners[i](this.store);return!0}},{key:"mergeState",value:function(obj){return this.setState(_extends({},_privateMap.get(this).state,obj))}},{key:"resetState",value:function(){var hasChanged=this.setState(this.initialState);return hasChanged&&this.lifecycle.emit("resetState"),hasChanged}},{key:"recycle",value:function(){var hasChanged=this.setState(this.initialState);return _privateMap.get(this).prevState={},this.lifecycle.emit("init",hasChanged),hasChanged}}]),Scope}();module.exports=Scope},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var Scope=__webpack_require__(1),Store=function Store(){var opt=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,Store);var scope=new Scope({store:this,opt:opt});Object.defineProperty(this,"scope",{enumerable:!0,configurable:!1,writable:!1,value:scope}),Object.defineProperty(this,"getState",{enumerable:!1,configurable:!1,writable:!1,value:scope.getState.bind(scope)}),Object.defineProperty(this,"setState",{enumerable:!1,configurable:!1,writable:!1,value:scope.setState.bind(scope)}),Object.defineProperty(this,"mergeState",{enumerable:!1,configurable:!1,writable:!1,value:scope.mergeState.bind(scope)}),Object.defineProperty(this,"getPrevState",{enumerable:!1,configurable:!1,writable:!1,value:scope.getPrevState.bind(scope)})};module.exports=Store},function(module,exports,__webpack_require__){"use strict";var Store=void 0,utils={clone:function(target){for(var _len=arguments.length,sources=Array(_len>1?_len-1:0),_key=1;_len>_key;_key++)sources[_key-1]=arguments[_key];return sources.forEach(function(source){var descriptors=Object.keys(source).reduce(function(descriptors,key){return descriptors[key]=Object.getOwnPropertyDescriptor(source,key),descriptors},{});Object.getOwnPropertySymbols(source).forEach(function(sym){var descriptor=Object.getOwnPropertyDescriptor(source,sym);descriptor.enumerable&&(descriptors[sym]=descriptor)}),Object.defineProperties(target,descriptors)}),target},isEquival:function(a,b){var aProps=Object.getOwnPropertyNames(a),bProps=Object.getOwnPropertyNames(b),aPropsLn=aProps.length,bPropsLn=bProps.length;if(aPropsLn!==bPropsLn)return!1;for(var i=0;aPropsLn>i;i++){var propName=aProps[i];if(a[propName]!==b[propName])return!1}return!0},ucFirst:function(str){return str.charAt(0).toUpperCase()+str.substr(1)},lcFirst:function(str){return str.charAt(0).toLowerCase()+str.substr(1)},handlerNameToActionName:function(str){return utils.lcFirst(str.substring(2))},generateStoreName:function(store){return utils.lcFirst(store.constructor.name)},getFuncName:function(fn){return fn.name||/^function\s+([\w\$]+)\s*\(/.exec(fn.toString())[1]},defineDisplayName:function(obj,displayName){Object.defineProperty(obj,"displayName",{enumerable:!0,configurable:!1,writable:!1,value:displayName})},isStore:function(value){return Store||(Store=__webpack_require__(2)),!0==value instanceof Store},getProtoProps:function(obj){var endProto=arguments.length<=1||void 0===arguments[1]?Object:arguments[1],props=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];return obj===endProto?props:utils.getProtoProps(obj.__proto__,endProto,props.concat(Object.getOwnPropertyNames(obj.prototype).filter(function(prop){return-1===props.indexOf(prop)})))},getStoreProtoProps:function(store){return utils.getProtoProps(utils.isStore(store)?store.constructor:store,Store)}};module.exports=utils},function(module,exports){!function(){"use strict";function Evemit(){this.events={}}Evemit.prototype.on=function(event,fn,context){return this.events[event]||(this.events[event]=[]),context&&(fn._E_ctx=context),this.events[event].push(fn),this},Evemit.prototype.once=function(event,fn,context){return fn._E_once=!0,this.on(event,fn,context)},Evemit.prototype.emit=function(event,arg1,arg2,arg3,arg4){var fn,evs,args,aLn;if(!this.events[event])return!1;args=Array.prototype.slice.call(arguments,1),aLn=args.length,evs=this.events[event];for(var i=0,ln=evs.length;ln>i;i++)switch(fn=evs[i],fn._E_once&&this.off(event,fn),aLn){case 0:fn.call(fn._E_ctx);break;case 1:fn.call(fn._E_ctx,arg1);break;case 2:fn.call(fn._E_ctx,arg1,arg2);break;case 3:fn.call(fn._E_ctx,arg1,arg2,arg3);break;case 4:fn.call(fn._E_ctx,arg1,arg2,arg3,arg4);break;default:fn.apply(fn._E_ctx,args)}return!0},Evemit.prototype.off=function(event,fn){if(!this.events[event])return this;for(var i=0,ln=this.events[event].length;ln>i;i++)this.events[event][i]===fn&&(this.events[event][i]=null,delete this.events[event][i]);return this.events[event]=this.events[event].filter(function(ltns){return"undefined"!=typeof ltns}),this},Evemit.prototype.listeners=function(event){var evs,ltns;if(event)return this.events[event]||[];evs=this.events,ltns=[];for(var ev in evs)ltns=ltns.concat(evs[ev].valueOf());return ltns},"undefined"!=typeof module&&module.exports?module.exports=Evemit:window.Evemit=Evemit}()}]));