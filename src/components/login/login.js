import { Button } from "antd"
import React from "react"
import { observer } from "mobx-react";
import './login.css'
import { useContext } from "react";
import AppContext from "../Hooks/AppContext";
import { useNavigate } from "react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon"

import { ReactComponent as UOM } from '../../Images/CoatOfArms.svg'

const UoMIcon = props => <Icon component={UOM} {...props} className='UOMLogo' />

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
                <p>Thank you for taking part in this annotation exercise. We are carrying out an annotation exercise to build a system that can automatically identify different types of hate speech in Maltese. Therefore, to proceed, you must be a native speaker of Maltese.</p>
                <p>In the annotation exercise, you will be asked to read a comment/phrase in Maltese and select the appropriate label/s that apply. If you are not comfortable with the type of data or you become uncomfortable at any point during the exercise, please feel free to stop immediately. It is up to you how many comments to annotate.</p>
                <p>At no point in this exercise will any identifiable information be requested or stored as part of the data collected from our side - we only save the labels that you select from a given list in relation to a particular comment/phrase. No other information is stored and your participation is completely anonymous.</p>
                <p>In the annotation exercise, you will be presented with one phrase/sentence at a time. You will be given a drop-down menu to choose from. The options available are: Toxicity, Obscene, Sexual Explicit, Identity Attack, Insult, Threat, Not Offensive. You can select more than one label for any phrase/sentence</p>
                <p>We ask that you consider the comment carefully before selecting a label. In this exercise there is no right or wrong answer - this is your perception of what you believe to be true about the phrase/comment that you will see. Try to provide labels for which you feel certain. </p>
                <p>Once you submit a label, you will be presented with another phrase/sentence to label. This will continue until you decide to stop.</p>
                <p>This annotation exercise is being carried out as part of my MSc Thesis under the supervision of Dr Claudia Borg (claudia.borg@um.edu.mt) and Dr Dylan Seychell (dylan.seychell@um.edu.mt). Feel free to contact me if you have any questions on: <strong>liam.m.mulvaney.22@um.edu.mt.</strong></p>
                <p>Regards,</p>
                <p>Liam Mulvaney</p>
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