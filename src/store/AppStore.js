import { message } from "antd";
import { action,  makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from 'uuid'
import { requests } from '../api/annotateRequests'

export class AppStore {
    loginId = ''
    comments = []
    commentsCount = 0
    comment = null
    commentIdx = 0
    labels = []
    labelsChosen = []
    isAuthenticated = false

    constructor() {
        makeObservable(this, {
            loginId: observable,
            comments: observable,
            labels: observable,
            labelsChosen: observable,
            isAuthenticated: observable,
            commentIdx: observable,
            comment: observable,
            commentsCount: observable,
            setLoginId: action,
            getCommentsAysnc: action,
            incrementCommentIdx: action,
            decreaseCommentSize: action,
            setCommentsAsync: action,
            setComment: action,
            logout: action,
            getTargetsAsync: action,
            getLabelsChosen: action,
            submitAnnotationAsync: action,
            refreshLabels: action
        })
    }

    getCommentsAysnc = async () => {       
        let data = await requests.get('/comments')
        return data        
    }

    incrementCommentIdx = () => ++this.commentIdx
    
    decreaseCommentSize = () => --this.commentsCount

    setCommentsAsync = async () => {
        try {
            this.comments = await this.getCommentsAysnc()
            this.commentsCount = this.comments.length
        } catch (error) {
            console.error(error)
            message.error('Could not fetch the comments. Please try again.') 
            return []
        }
    }

    setComment = (id) => {
        this.comment = this.comments.find(c => c.CommentID === id)
    }
    
    setLoginId = () => {
        this.loginId = uuidv4()
        this.isAuthenticated = true
    }

    logout = () => {
        this.isAuthenticated = false
    }

    getTargetsAsync = async () => {
        try {
            this.labels = await requests.get('/labels')
        } catch (error) {
            console.error(error)
            message.error('Could not fetch the target labels. Please try again.') 
            return []
        }
    }

    getLabelsChosen = (value) => {
        this.labelsChosen = value
    }

    refreshLabels = () => {
        this.labelsChosen = []
    }

    submitAnnotationAsync = async (commentId) => {
        await requests.post('/annotate', {
            annotatorId: this.loginId,
            commentId,
            targets: this.labelsChosen
        })
    }
}


export default AppStore;
