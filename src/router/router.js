/* import React from 'react';
import { BrowserRouter, Route,  Switch, Link } from 'react-router-dom';

import Bundle from "./bundle";
import Home from 'bundle-loader?lazy&name=home!containers/Home/Home';
import About from 'bundle-loader?lazy&name=about!containers/About/About';
import Counter from "bundle-loader?lazy&name=counter!containers/Counter/Counter";
import UserInfo from "bundle-loader?lazy&name=userInfo!containers/UserInfo/UserInfo";

const Loading = () => {
    return <div>加载中...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);

const getRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="">首  页</Link></li>
                    <li><Link to="/userinfo">用户信息</Link></li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={createComponent(Home)} />
                    <Route path="/userinfo" component={createComponent(UserInfo)} />
                    <Route path="/conuter" component={createComponent(Counter)} />
                    <Route path="/about" component={createComponent(About)} />
                </Switch>
            </div>
        </BrowserRouter>
    )
};
export default getRouter; */