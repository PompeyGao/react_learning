import React, { Component } from "react";
import style from './About.css';
import image from "./images/qgwl.gif";

export default class About extends Component{
    render(){
        return(
            <div className={style.font_box}>
                这是About页面
                <img src={image} />
            </div>
        )
    }
}