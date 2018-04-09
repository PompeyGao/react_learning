import React from 'react';
import {
    BrowserRouter as Router,
    Route,  Switch, Link
} from 'react-router-dom';
import Home from 'containers/Home/Home';
import About from 'containers/About/About';
import Counter from "containers/Counter/Counter";

const getRouter = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="">首 页</Link> </li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/conuter" component={Counter} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    )
}
export default getRouter;