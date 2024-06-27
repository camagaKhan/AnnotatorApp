import { useContext, useEffect } from "react"
import AppContext from "../Hooks/AppContext"
import { observer } from "mobx-react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Select, message } from "antd"
import {
    LogoutOutlined,
    RightOutlined
  } from '@ant-design/icons';
import './wizard.css'
import Icon from "@ant-design/icons/lib/components/Icon"
import { ReactComponent as UOM } from '../../Images/CoatOfArms.svg'

const UoMIcon = props => <Icon component={UOM} {...props} className='UOMLogo' />

const CommentWizard = () => {
    const context = useContext(AppContext), { commentId } = useParams(), navigate = useNavigate() 

    useEffect (() => {
        context.setAnnotatorStateAsync(commentId)
    }, [commentId, context]) 

    const btnAnnotateLogicAsync = async () => {
        if (context.labelsChosen.length === 0) return message.warning('Please choose a label from the "Target" list. If the comment is "Not Offensive" select the "Not Offensive" item from the list.')
        context.submitAnnotationAsync(commentId)
        let idx = context.incrementCommentIdx(), comment = context.comments[idx]
        context.decreaseCommentSize()
        context.refreshLabels()
        navigate(`/annotateComment/${comment.CommentID}`)
    }

    const btnSkip = () => {
        let idx = context.incrementCommentIdx(), comment = context.comments[idx]
        context.decreaseCommentSize()
        context.refreshLabels()
        navigate(`/annotateComment/${comment.CommentID}`)
    }

    const btnLogout = () => {
        context.logout()
        navigate('/thankyou')
    }

    const onChangeLabels = (value) => {
        context.getLabelsChosen(value)
    }

    return (
        <div className="app-container container-layout">
            <div className="comment-container">
                <div className="toolbar">
                    <UoMIcon />
                    <Button 
                        className="btn-annotate-dashed"
                        type='dashed' 
                        title='Logout?' 
                        onClick={btnLogout}
                    >
                        Stop Exercise <LogoutOutlined />
                    </Button>
                    <Button className="btn-annotate-dashed" type='dashed' onClick={btnSkip}>
                        Skip <RightOutlined />
                    </Button>

                        
                </div>

                <div>
                    <p>1) Read the comment.</p>
                    <p>2) Choose one or more labels to describe the comment. If a comment does not fit any of the provided labels, please select "Not Offensive."</p>
                    <p>3) When ready tap/click on the button to annotate it.</p>
                    <p>4) Tap/Click on the Skip button to skip the comment</p>
                    <p>5) Tap/Click "{<LogoutOutlined />}" button to end session. </p>
                </div>

                <h1>Comment:</h1>
                <p><i>{context.comment && context.comment.USER_COMMENT}</i></p>

                <label id='lbl-target'>How would you rate this Phrase/Sentence?</label>
                <Select mode = 'multiple'
                 placeholder = "Click here to choose one or more labels"
                 className="target-labels" size='large'
                 value={context.labelsChosen} 
                 onChange={onChangeLabels} 
                 options={context.labels.map(l => {
                    return { value : l.LabelID, label: l.Labels }
                })} />

                <Button className="btn-annotator" type='primary' onClick={btnAnnotateLogicAsync} size='large'>Annotate</Button>
            </div>
        </div>
    )
}


export default observer(CommentWizard)