import { Button } from "antd"
import React from "react"
import { observer } from "mobx-react";
import './login.css'
import { useContext } from "react";
import AppContext from "../Hooks/AppContext";
import { useNavigate } from "react-router-dom";
//import Icon from "@ant-design/icons/lib/components/Icon"

//import { ReactComponent as UOM } from '../../Images/CoatOfArms.svg'

//const UoMIcon = props => <Icon component={UOM} {...props} className='UOMLogo' />

function Login () {
    const context = useContext(AppContext),
    navigate = useNavigate();

    const imagePath = require('../../Images/ICT_AI_Red Logo.png')

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
                <div className="toolbar">
                    <img src={imagePath} className="landing-logo" alt='Department of AI'/>
                </div>
                <p>Hi!</p>
                <p>Thank you for participating in this annotation exercise to help build a system for identifying types of hate speech in Maltese. To proceed, you must be a native Maltese speaker.</p>
                <p>You will read comments/phrases in Maltese and select the appropriate labels. If you feel uncomfortable at any point, you can stop immediately. Your participation is anonymous, and no identifiable information will be stored.</p>
                <p>For each phrase, choose from the following labels: Toxicity, Obscene, Sexual Explicit, Identity Attack, Insult, Threat, Not Offensive. You can select more than one label.</p>
                <p>Consider each comment carefully before selecting a label. There are no right or wrong answers; choose what you believe to be true about the phrase/comment. Continue labeling until you decide to stop.</p>
                <p>This exercise is part of my MSc Thesis, supervised by Dr. Claudia Borg (claudia.borg@um.edu.mt) and Dr. Dylan Seychell (dylan.seychell@um.edu.mt). If you have any questions, feel free to contact me at liam.m.mulvaney.22@um.edu.mt.</p>
                <p>Regards, <br /> Liam Mulvaney</p>
            </div>
            <div className="login-container container-layout">
                <Button type="primary" className="btn-login btn-annotator" size="large" onClick={loginLogicAsync}>
                    Start
                </Button>
            </div>  
        </div>        
    )
}


export default observer(Login)