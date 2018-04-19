import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () =>{
    return (
        <ul>
            <li><Link to="">首  页</Link></li>
            <li><Link to="/userinfo">用户信息</Link></li>
            <li><Link to="/conuter">计 数 器</Link></li>
            <li><Link to="/about">关 于</Link></li>
        </ul>
    )
};
export default Nav;