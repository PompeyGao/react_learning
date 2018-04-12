import React, { Component } from "react";
import './About.css';
import image from "./images/qgwl.gif";

export default class About extends Component{
    render(){
        return(
            <div className="font-box">
                这是About页面
                <img src={image} />
            </div>
        )
    }
}