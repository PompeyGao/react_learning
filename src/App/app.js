import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Nav from 'components/Nav/Nav';
import Bundle from "router/bundle";
import store from '../redux/store';
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
            (Component) => Component ? <Component {...props} /> : <Loading {...props} />
        }
    </Bundle>
);

export default class App extends Component {
    render(){
        return (
            <AppContainer>
                <Provider store={store}>
                    <BrowserRouter>
                        <div>
                            {Nav()}
                            <Switch>
                                <Route exact path="/" component={createComponent(Home)} />
                                <Route path="/userinfo" component={createComponent(UserInfo)} />
                                <Route path="/conuter" component={createComponent(Counter)} />
                                <Route path="/about" component={createComponent(About)} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </AppContainer>
        )
    }
}
