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
            <div className="letter-container login-text pad-container">
                <p>Dear Participant,</p>
                <p>We are pleased to invite you to participate in an important annotation exercise aimed at improving our understanding of online discourse in Malta.</p> 
                <p>As a participant, you will be provided with a list of comments from the Times of Malta and Malta Today. Your task is to annotate these comments based on the given categories. If a comment does not fit any of the provided labels, please select "Not Offensive." Your valuable input will contribute to creating a dataset that will train a Toxic Comment Classifier AI Model specifically using comments from your news portals.</p>
                <h5>Important Notes:</h5>
                <p>1) No personal data will be stored during this exercise.</p>
                <p>2) You may choose to quit at any time without any consequences..</p>
                <p>Thank you for considering this opportunity to contribute to our research.</p>
                <p>Best regards, <br /> Liam Mulvaney.</p>
            </div>
            <div className="login-container container-layout">
                <Button type="primary" className="btn-login" size="large" onClick={loginLogicAsync}>
                    Start
                </Button>
            </div>  
        </div>        
    )
}


export default observer(Login)