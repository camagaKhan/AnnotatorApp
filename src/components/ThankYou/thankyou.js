import { observer } from "mobx-react";
import './thanks.css'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ThankYou () {
    const imagePath = require('../../Images/ICT_AI_Red Logo.png')

    const navigate = useNavigate()

    const loginPage = () => {
        navigate('/home')
    }

    return (
        <div className="app-container thx container-layout">
            <img src={imagePath} className="thanks-img" alt='Department of AI'/>
            <div className="thx-container">
                If you're interested in research related to AI in Journalism, we invite you to join our community by filling out this <a className="uom-form" href='https://forms.gle/hpDzFAuZaP9Aoay39'>form</a>.
            </div>
            <div className="thx-container">
                <p>This annotation exercise is being carried out as part of my MSc Thesis under the supervision of Dr Claudia Borg (claudia.borg@um.edu.mt) and Dr Dylan Seychell (dylan.seychell@um.edu.mt). Feel free to contact me if you have any questions on: <strong>liam.m.mulvaney.22@um.edu.mt.</strong></p>
                <p>Regards,</p>
                <p>Liam Mulvaney</p>
                <p className="lnd-page">
                    <Button type='link' onClick={loginPage}> {'<'} Back to Landing Page?</Button>
                </p>
            </div>                        
        </div>
    )
}

export default observer(ThankYou)