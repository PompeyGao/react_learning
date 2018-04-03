/*使用es6的箭头函数*/
/* var func = str =>{
    document.getElementById('app').innerHTML = str
}
func('我现在在使用Babel!'); */

import React from "react";
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import Hello from './components/Hello/Hello.js';
import getRouter from './router/router';

const render = Component => {
    ReactDom.render(
        <AppContainer>
            {Component}
        </AppContainer>,
        document.getElementById('app')
    );
}

/**初始化 */
render(getRouter());

/**热更新 */
if (module.hot) {
    module.hot.accept('./router/router.js', () => {
        const NextGetRouter = require('./router/router').default;
        render(NextGetRouter())
    });
}