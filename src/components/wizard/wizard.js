import { useContext, useEffect } from "react"
import AppContext from "../Hooks/AppContext"
import { observer } from "mobx-react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, Row, Select } from "antd"
import {
    LogoutOutlined
  } from '@ant-design/icons';
import './wizard.css'

const CommentWizard = () => {
    const context = useContext(AppContext), { commentId } = useParams(), navigate = useNavigate()

    useEffect(() => {
        if (commentId) context.setComment(parseInt(commentId))
    }, [commentId, context])

    const btnNextLogicAsync = async () => {
        context.submitAnnotationAsync(commentId)
        let idx = context.incrementCommentIdx(), comment = context.comments[idx]
        context.decreaseCommentSize()
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
                    <Col span={22}></Col>
                    <Col span={1}>
                        <Button type='dashed' title='Logout?' onClick={btnLogout}>
                            <LogoutOutlined />
                        </Button>
                    </Col>
                </Row>
                <h1>Comment:</h1>
                <p>{context.comment && context.comment.USER_COMMENT}</p>
                <Select mode = 'multiple' className="target-labels" size='large' onChange={onChangeLabels} options={context.labels.map(l => {
                    return { value : l.LabelID, label: l.Labels }
                })} />
                <Button type='primary' onClick={btnNextLogicAsync} size='large'>Next (Total comments to Annotate: { context.commentsCount})</Button>
            </div>
        </div>
    )
}


export default observer(CommentWizard)