import React from 'react';
import { BrowserRouter, Route,  Switch, Link } from 'react-router-dom';
import Home from 'containers/Home/Home';
import About from 'containers/About/About';
import Counter from "containers/Counter/Counter";
import UserInfo from "containers/UserInfo/UserInfo";

const getRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="">首 页</Link> </li>
                    <li><Link to="/userinfo">用户信息</Link></li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/userinfo" component={UserInfo} />
                    <Route path="/conuter" component={Counter} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default getRouter;