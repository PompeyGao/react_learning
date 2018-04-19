import React from "react";
import ReactDom from 'react-dom';
import App from './App/app';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    const NEXT = require('./App/app').default;
    ReactDom.render(<NEXT />, MOUNT_NODE)
}
/**热更新 */
if (module.hot) {
    module.hot.accept('./App/app', () =>
        setImmediate(() => {
            ReactDom.unmountComponentAtNode(MOUNT_NODE);
            render();
        })
    );
}
render();
