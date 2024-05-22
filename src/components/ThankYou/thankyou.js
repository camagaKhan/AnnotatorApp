import { observer } from "mobx-react";
import './thanks.css'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ThankYou () {
    const imagePath = require('../../Images/smiley.jpg')

    const navigate = useNavigate()

    const loginPage = () => {
        navigate('/login')
    }

    return (
        <div className="app-container container-layout">
            <img src={imagePath} className="thanks-img" alt='Dynamic Example'/>
            <div>
                <h1>Thank you!</h1>
            </div>
            <Button type='link' onClick={loginPage}>Back to Login?</Button>
        </div>
    )
}

export default observer(ThankYou)