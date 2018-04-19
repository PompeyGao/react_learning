import React, { Component } from "react";
import { hot } from 'react-hot-loader';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick(){
        this.setState({
            count: ++this.state.count
        })
    }

    render(){
        const{
            count
        } = this.state;

        return(
            <div>
                首页欢迎你~~~<br/>
                当前计数：{this.state.count} <br/>
                <button onClick={() => this._handleClick()}> 加1s</button>
            </div>
        )
    }
}
export default hot(module)(Home);