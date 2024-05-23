import { useContext, useEffect } from "react"
import AppContext from "../Hooks/AppContext"
import { observer } from "mobx-react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, Row, Select } from "antd"
import {
    LogoutOutlined,
    RightOutlined
  } from '@ant-design/icons';
import './wizard.css'

const CommentWizard = () => {
    const context = useContext(AppContext), { commentId } = useParams(), navigate = useNavigate()

    useEffect(() => {
        if (commentId) context.setComment(parseInt(commentId))
    }, [commentId, context])

    const btnAnnotateLogicAsync = async () => {
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
                <Row>
                    <Col span={15}></Col>
                    <Col span={6}>
                        <Button type='dashed' onClick={btnSkip}>
                            Skip <RightOutlined />
                        </Button>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Button type='dashed' title='Logout?' onClick={btnLogout}>
                            <LogoutOutlined />
                        </Button>
                    </Col>
                </Row>
                <h1>Comment:</h1>
                <p><i>"{context.comment && context.comment.USER_COMMENT}"</i> - User</p>

                <label style={{padding:'15px 0 15px 0', fontWeight: 'bold'}}>Target:</label>
                <Select mode = 'multiple' className="target-labels" size='large' value={context.labelsChosen} onChange={onChangeLabels} options={context.labels.map(l => {
                    return { value : l.LabelID, label: l.Labels }
                })} />

                <div>
                    <p>1) Read the comment.</p>
                    <p>2) Choose one or more labels to describe the comment.</p>
                    <p>3) When ready tap/click on the <strong>"Annotate (Total comments to Annotate: { context.commentsCount})"</strong> button to annotate it.</p>
                    <p>4) Tap/Click on the Skip button to skip the comment</p>
                    <p>5) Tap/Click "{<LogoutOutlined />}" button to end session. </p>
                </div>

                <Button type='primary' onClick={btnAnnotateLogicAsync} size='large'>Annotate (Total comments to Annotate: { context.commentsCount})</Button>
            </div>
        </div>
    )
}


export default observer(CommentWizard)