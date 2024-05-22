import { Button } from "antd"
import React from "react"
import { observer } from "mobx-react";
import './login.css'
import { useContext } from "react";
import AppContext from "../Hooks/AppContext";
import { useNavigate } from "react-router-dom";

function Login () {
    const context = useContext(AppContext),
    navigate = useNavigate();

    const loginLogicAsync = async () => {
        context.setLoginId()                
        await Promise.all([context.setCommentsAsync(), context.getTargetsAsync()])
        if (context.comments.length > 0) {
            navigate(`/annotateComment/${context.comments[0].CommentID}`)
        }
    }

    return (
        <div className="app-container container-layout" >
            <div className="login-container container-layout">
                <Button type="primary" className="btn-login" size="large" onClick={loginLogicAsync}>
                    Login
                </Button>
            </div>            

            <div className="login-container login-text pad-container">
                <small>Help us annotate our comments for a safer space. <i>(No personal data will be stored for this study).</i></small>
            </div>
        </div>        
    )
}


export default observer(Login)