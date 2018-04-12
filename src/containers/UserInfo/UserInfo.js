import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "actions/userInfo";

/* @connect(
    state => {
        const {userInfo = {}} = state || {};
        return {...userInfo};
    },
    dispatch => ({
        actions: {getUserInfo}
    })
) */

class UserInfo extends Component {
    render() {
        const { userInfo: { isLoading, userInfo, errorMsg }, getUserInfo } = this.props;
        return (
            <div>
                {
                    isLoading
                        ? "信息获取中..."
                        : (errorMsg
                            ? errorMsg
                            : <div>
                                <p>用户信息</p>
                                <p>用户名：{userInfo.name}</p>
                                <p>用户简介：{userInfo.intro}</p>
                            </div>)
                }
                <button onClick={() => getUserInfo()}>获取用户信息</button>
            </div>
        )
    }
}
export default connect(state => ({ userInfo: state.userInfo }), { getUserInfo })(UserInfo);