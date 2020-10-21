import React from 'react';
import {Card} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import moment from 'react-moment';
import '../../Pages/ChatBox/ChatBox.css';
import LoginString from '../Login/LoginStrings';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowStiker: false,
            inputValue:""
        }
        this.currentUserName = localStorage.getItem(LoginString.Name)
        this.currentUserId = localStorage.getItem(LoginString.ID)
        this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL)
        this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentID)
        this.stateChanged = localStorage.getItem(LoginString.UPLOAD_CHANGED)
        this.currentPeerUser = this.props.currentPeerUser
        this.groupChatId = null;
        this.listMessage = [];
        this.currentPeerUserMessages = [];
        this.removeListener = null;
        this.currentPhotoFile = null;

        firebase.firestore().collection('users').doc(this.currentPeerUser.documentKey).get()
            .then((docRef) => {
                this.currentPeerUserMessages = docRef.data().messages
            })
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentWillReceiveProps(newProps) {
        if(newProps.currentPeerUser) {
            this.currentPeerUser = newProps.currentPeerUser
            this.getListHistory()
        }
    }
    componentDidMount() {
        this.getListHistory()
    }
    getListHistory() {
        this.listMessage.length = 0
        this.setState({isLoading: true})
        if(
            this.hashString(this.currentUserId) <=
            this.hashString(this.currentPeerUser.id)
        ){
            this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`
        }else{
            this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`
        }
        //Get history and listen new data added
        this.removeListener = firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .onSnapshot(
            Snapshot => {
                Snapshot.docChanges().forEach(change => {
                    if(change.type === LoginString.DOC) {
                        this.listMessage.push(change.doc.data())
                    }
                })
                this.setState({isLoading: false})
            },
            err => {
                this.props.showToast(0, err.toString())
            }
        ) 
    }
    onSendMessage = (content, type) => {
        let = notificationMessages = []
        if(content.trim() === '') {
            return
        }
        const timestamp = moment()
        .valueOf()
        .toString()

        const itemMessage = {
            idFrom: this.currentUserId,
            idTo: this.currentPeerUser.id,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }
        firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(() => {
            this.setState({inputValue: ''})
        })
        this.currentPeerUserMessages.map((item) => {
            if(item.notificationId != this.currentUserId) {
                notificationMessages.push(
                    {
                        notificationId: item.notificationId,
                        number: item.number
                    }
                )
            }
        })
        firebase.firestore()
        .collection('users')
        .doc(this.currentPeerUser.documentKey)
        .update({
            messages: notificationMessages
        })
        .then((data)=> {})
        .catch(err => {
            this.props.showToast(0, err.toString())
        })
    }
    scrollToBottom = () => {
        if(this.messagesEnd) {
            this.messagesEnd.scrollIntoView({})
        }
    }

    onKeyboardPress = event => {
        if(event.key === 'Enter') {
            this.onSendMessage(this.state.inputValue, 0)
        }
    }

    render() {
        return (
            <Card className="viewChatBoard">
                <div className="headerChatBoard">
                    <img 
                        className="viewAvatarItem"
                        src = {this.currentPeerUser.URL}
                        alt=""
                    />
                    <span className="textHeaderChatBoard">
                        <p style={{fontSize:'20px'}}>{this.currentPeerUser.name}</p>
                    </span>
                    <div className="aboutme">
                        <span>
                            <p>{this.currentPeerUser.description}</p>
                        </span>
                    </div>
                </div>
                <div className="viewListContentChat">
                    {/* {} */}
                    <div
                        style={{float: 'left', clear: 'both'}}
                        ref={el => {
                            this.messagesEnd = el
                        }}
                    />
                </div>
                {this.state.isShowStiker ? this.renderSticker(): null}

                <div className="viewBottom">
                    <img 
                        className="icOpenGallery"
                        src={images.photo}
                        alt="input_file"
                        onClick = { () => {this.refInput.click()} }
                    />
                    <img
                        className="viewInputGallery"
                        accept="iamges/*"
                        type="file"
                        onChange={this.onChoosePhoto}
                    />
                    <input
                        className="viewInput"
                        placeholder="Escribe un mensaje"
                        value={this.state.inputValue}
                        onChange={event => {
                            this.setState({inputValue: event.target.value})
                        }}
                        onKeyPress = {this.onKeyPress}
                    />
                    <img
                        className="icSend"
                        src={images.send}
                        alt="icon send"
                        onClick={() => {this.onSendMessage(this.state.inputValue, 0)}}
                    />
                </div>
                    {this.state.isLoading ? (
                        <div className="viewLoading">
                            <ReactLoading 
                                type={'spin'}
                                color={'#203152'}
                                height={'3%'}
                                width={'3%'}
                            />
                        </div>
                    ) : null}
            </Card>
        )
    }
    hashString = str => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash //Convert to 32 bit integer
        }
        return hash
    }
}