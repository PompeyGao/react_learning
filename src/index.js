/*使用es6的箭头函数*/
/* var func = str =>{
    document.getElementById('app').innerHTML = str
}
func('我现在在使用Babel!'); */

import React from "react";
import ReactDom from 'react-dom';
import Hello from './components/Hello/Hello.js';
import getRouter from './router/router';

if(module.hot){
    module.hot.accept();
}

ReactDom.render(
    getRouter(),document.getElementById('app')
)