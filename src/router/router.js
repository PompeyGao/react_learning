import React from 'react';
import {
    BrowserRouter as Router,
    Route,  Switch, Link
} from 'react-router-dom';
import Home from '../containers/Home/Home.js';
import About from '../containers/About/About.js';

const getRouter = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="">首页</Link>
                    </li>
                    <li>
                        <Link to="/about">关于</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    )
}
export default getRouter;