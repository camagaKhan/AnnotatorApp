import { message } from "antd";
import { action,  makeObservable, observable, runInAction } from "mobx";
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
    loadComments = false

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
            loadComments: observable,
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
            refreshLabels: action,
            loadState: action,
            getContentsForAnotationAsync: action,      
            updateCommentsAsync : action,    
            setAnnotatorStateAsync: action   
        })

        this.loadState()
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

    updateCommentsAsync = async (annotatedIds, commentId) => {
        try {
            const { data } = await requests.post('/set/comments', {
                ids: annotatedIds,
                id: commentId
            })  //await this.getCommentsAysnc()
            this.comments = data
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

    loadState = () => {
        const session = sessionStorage.getItem('appSession')
        if (session) {
            let { loginId, isAuthenticated } = JSON.parse(session)
            this.loginId = loginId
            this.isAuthenticated = isAuthenticated
            this.loadComments = true
        }  
    }

    getContentsForAnotationAsync = async (commentId) => {
        let annotatedIds = [], session = sessionStorage.getItem('appSession')
        if (session) annotatedIds = JSON.parse(session).annotatedIds
        
        await Promise.all([this.getTargetsAsync(), this.updateCommentsAsync(annotatedIds, commentId)])
        this.loadComments = false // the comments are loaded. We no longer need to reload the comments
    }
    
    setLoginId = () => {
        this.loginId = uuidv4()
        this.isAuthenticated = true
        sessionStorage.setItem('appSession', JSON.stringify({ loginId: this.loginId, isAuthenticated: this.isAuthenticated, annotatedIds: [] }))       
    }

    logout = () => {
        this.isAuthenticated = false
        sessionStorage.removeItem('appSession')
    }

    getTargetsAsync = async () => {
        try {
            let data = await requests.get('/labels')
            data.push({ LabelID: 7, Labels: 'Not Offensive' })
            this.labels = data
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
        let isNotOffensive = this.labelsChosen.find(l => l.LabelID === 7), targets = this.labelsChosen
        if (isNotOffensive) targets = []
        
        await requests.post('/annotate', {
            annotatorId: this.loginId,
            commentId,
            targets
        })

        const session = JSON.parse(sessionStorage.getItem('appSession'))
        if(session) {
            session.annotatedIds.push(commentId)
            sessionStorage.setItem('appSession', JSON.stringify(session))
        }
        
    }

    setAnnotatorStateAsync = (commentId) => {  
        runInAction(async () => {
            if (commentId) {
                if (this.loadComments) await this.getContentsForAnotationAsync(commentId) // <-- this is a check point
                this.setComment(parseInt(commentId))
            }
        })         
    }
}


export default AppStore;
