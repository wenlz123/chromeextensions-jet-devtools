//console.log('content_script.js');
function customConsole() {
    function JetDebugger() {
        let self = this;
        function getKo() {
            let ko = window.ko;

            if (!ko) {
                if (typeof window.require === 'function') {
                    let isDefinedAvailable = typeof window.require.defined === 'function';
                    try {
                        if ((isDefinedAvailable && require.defined('ko')) || !isDefinedAvailable) {
                            ko = require('ko');
                        }
                    } catch (e) { /*ingore */
                    }
                    if (!ko) {
                        try {
                            if ((isDefinedAvailable && require.defined('knockout')) || !isDefinedAvailable) {
                                ko = require('knockout');
                            }
                        } catch (e) { /*ingore */
                        }
                    }
                }
            }
            return ko;
        }
        
        function getElement() {
            let elem = null;
            let args = arguments[0];
            if (args.length > 0) {
                elem = document.querySelectorAll(args[0]);
            } else {
                elem = $0;
                if (!$0) {
                    console.error('No function arguments detected, please select one item in the page.');
                }
            }
            return elem;
        }

        function attributeToPropertyName(attr) {
            return attr.toLowerCase().replace(/-(.)/g,
                    function (match, group1)
                    {
                        return group1.toUpperCase();
                    }
            );
        }

        function getKnockoutRelated(type, args) {
            function getResultElem(elem) {
                let result = null;
                switch (type) {
                    case 'dataFor':
                    case 'dataForToJs':
                        result = ko.dataFor(elem);
                        if (type === 'dataForToJs') {
                            result = this.toJs(result);
                        }
                        break;
                    case 'contextFor':
//                    case 'contextForToJs':
                        result = ko.contextFor(elem);
                        if (type === 'dataForToJs') {
                            result = this.toJs(result);
                        }
                        break;
                    case 'getBindings':
                    case 'getBindingsToJs':
                        result = {};
                        let koBinding = ko.bindingProvider.instance.getBindings(elem, ko.contextFor(elem));
                        if (koBinding !== null) {
                            result.ko = koBinding;
                        }
                        let attrs = elem.attributes;
                        if (attrs) {// comment is empty
                            for (let i = 0; i < attrs.length; i++) {
                                let attr = attrs[i].name;
                                let attrValue = null;
                                let byPassAttr = ['id', 'for', 'class', 'style', 'aria-labelledby', 'data-bind'];
                                let prop = attr.indexOf(':') === 0 ? attr.substring(1) : attributeToPropertyName(attr);
                                if(attr.toLowerCase().indexOf(':style') === 0){
                                    attrValue = elem.style.cssText;
                                    if(attr.toLowerCase() === ':style'){
                                        
                                    }else{
                                        let styleProp = attr.toLowerCase().replace(':style.', '');
                                        let tmpArr = attrValue.replace(/\s/g, '').split(';');
                                        for(let i=0;i<tmpArr.length;i++){
                                            let item = tmpArr[i];
                                            let token = item.split(':');
                                            if(token[0] && token[0].toLowerCase() === styleProp){
                                                attrValue = token[1];
                                                break;
                                            }
                                        }
                                    }
                                    result.cca = result.cca || {};
                                    result.cca[attr] = attrValue;
                                }else if (byPassAttr.indexOf(attr) === -1 && elem[prop] !== null) {
                                    attrValue = elem[prop];
                                    if(!attrValue){
                                        attrValue = attrs[i].nodeValue;
                                    }
                                    result.cca = result.cca || {};
                                    result.cca[attr] = attrValue;
                                }
                                
                            }
                        }
                        if (type === 'getBindingsToJs') {
                            result = this.toJs(result);
                        }
                        break;
                }
                return result;
            }
            let ko = getKo();
//            console.log(ko);
            let elem = getElement(args);
            let result = null;
            if (elem) {
                if (elem.nodeName === 'SCRIPT') {
                    return null;
                } else if (elem.length > 0 && elem.nodeType !== 8 /* comment */ && elem.nodeType !== 3 /* text */) {
                    result = [];
                    elem.forEach(function (e) {
                        let tmpElem = getResultElem.call(self, e);
                        result.push(tmpElem);
                    });
                } else {
                    result = getResultElem.call(self, elem);
                }
            } else {
                return null;
            }
            return result;
        }

        self.toJs = function (obj, level) {
//            console.log(obj, level);
            let rtn = {};
            let ko = getKo();
            if (typeof level === 'undefined') {
                level = 0;
            }
            if (level < 20) { // If not, the function will be in looping
                for (let indx in obj) {
                    let objVal = obj[indx];
                    rtn[indx] = objVal;
                    switch (typeof objVal) {
                        case 'function':
                            if (ko.isObservable(objVal)) {
                                rtn[indx] = ko.unwrap(objVal);
                            }
                            break;
                        case 'object':
                            rtn[indx] = self.toJs(obj[indx], ++level);
                            break;
                    }
                }
            }
            return rtn;
        }
        self.dataFor = function () {
            return getKnockoutRelated('dataFor', arguments);
        }.bind(console);
        self.dataForToJs = function () {
            return getKnockoutRelated('dataForToJs', arguments);
        }.bind(console);

        self.contextFor = function () {
            return getKnockoutRelated('contextFor', arguments);
        }.bind(console);
//        self.contextForToJs = function () {
//            return getKnockoutRelated('contextForToJs', arguments);
//        }.bind(console);
        self.getBindings = function () {
            return getKnockoutRelated('getBindings', arguments);
        };
        self.getBindingsToJs = function () {
            return getKnockoutRelated('getBindingsToJs', arguments);
        };
        
        self.inspect = function (id) {
            if(id){
                if(typeof id === 'string'){
                    id = document.querySelector(id);
                }
                inspect(id);
            }else{
                console.error('self.inspect needs one parameter. It can be a selecter string or html element object.');
            }
        }.bind(console);

        self.test = function (arg1) {
            console.log(arguments);
        };
    }
    window.jetDebugger = new JetDebugger();
}

function contentScriptMain() {
    let script = document.createElement('script'),
            code = document.createTextNode('(' + customConsole + ')()');
    script.appendChild(code);
    (document.body || document.head || document.documentElement).appendChild(script);
}
contentScriptMain();


//chrome.runtime.onMessage.addListener(
//        function (request, sender, sendResponse) {
//            if (request.greeting === "hello") {
//                sendResponse({farewell: "goodbye"});
//            }
//
//        });

