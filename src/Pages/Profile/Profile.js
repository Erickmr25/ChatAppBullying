import React from 'react';
import '../../Pages/Profile/Profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import LoginString from '../Login/LoginStrings';
import Chart from '../../Components/Chart';

export default class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            documentKey: localStorage.getItem(LoginString.FirebaseDocumentID),
            id: localStorage.getItem(LoginString.ID),
            name: localStorage.getItem(LoginString.Name),
            aboutMe: localStorage.getItem(LoginString.Description),
            photoUrl: localStorage.getItem(LoginString.PhotoURL)
        }
        this.newPhoto = null
        this.newPhotoUrl =""
    }
    componentDidMount() {
        if(!localStorage.getItem(LoginString.ID)){
            this.props.push("/")
        }
    }
    onChangeNickname=(event)=>{
        this.setState({
            name: event.target.value
        })
    }  
    onChangeAboutMe=(event)=>{
        this.setState({
            aboutMe: event.target.value
        })
    }
    onChangeAvatar=(event)=> {
        if(event.target.files && event.target.files[0]) {
            const prefixFiletype = event.target.files[0].type.toString()
            
            if(prefixFiletype.indexOf(LoginString.PREFIX_IMAGE) !== 0 ) {
                this.props.showToast(0, "Este archivo no es una imagen")
                return
            }
            this.newPhoto = event.target.files[0]
            this.setState({photoUrl: URL.createObjectURL(event.target.files[0])})
        }else {
            this.props.showToast(0, "Algo anda mal con el archivo de entrada.")
        }
    }

    uploadAvatar = () => {
        this.setState({isLoading: true})
        if(this.newPhoto) {
            const uploadTask = firebase.storage()
            .ref()
            .child(this.state.id)
            .put(this.newPhoto)
            uploadTask.on(
                LoginString.UPLOAD_CHANGED,
                null,
                err => {
                    this.props.showToast(0, err.message)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.updateUserInfo(true, downloadURL)
                    })
                }
            )
        }else {
            this.updateUserInfo(false, null)
        }
    }
    


    updateUserInfo = (isUpdatedPhotoURL, downloadURL) => {
        let newinfo
        if(isUpdatedPhotoURL) {
            newinfo = {
                name: this.state.name,
                Description: this.state.aboutMe,
                URL: downloadURL
            }
        }else {
            newinfo = {
                name: this.state.name,
                Description: this.state.aboutMe
            }
            firebase.firestore().collection('users')
            .doc(this.state.documentKey)
            .update(newinfo)
            .then(data => {
                localStorage.setItem(LoginString.Name, this.state.name)
                localStorage.setItem(LoginString.Description, this.state.aboutMe)
                
                if(isUpdatedPhotoURL) {
                    localStorage.setItem(LoginString.PhotoURL, downloadURL)
                }
                this.setState({isLoading: false})
                this.props.showToast(1, "Información actualizada correctamente")
            })
        }
    }

    render() {
        return (
            <div className="profileroot">
                <div className="headerprofile">
                    <span>Perfil</span>
                </div>
                <img className="avatar" alt="" src={this.state.photoUrl} />
                <div className="viewWrapInputFile">
                    <img 
                        className="imgInputFile"
                        alt="icon gallery"
                        src={images.choosefile}
                        onClick = { () => {this.refInput.click()}}
                    />
                    <input 
                        ref = { el => {
                            this.refInput = el
                        }}
                        accept="image/*"
                        className="viewInputFile"
                        type="file"
                        onChange={this.onChangeAvatar}
                    />
                </div>

                <span className="textLabel">Nombre</span>
                <input
                    className="textInput"
                    value={this.state.name ? this.state.name : ""}
                    placeholder="Tu nombre de usuario..."
                    onChange={this.onChangeNickname}
                />
                <span className="textLabel">Acerca de mí</span>
                <input 
                    className="textInput"
                    value={this.state.aboutMe ? this.state.aboutMe : ""}
                    placeholder="Di algo acerca de mi...."
                    onChange={this.onChangeAboutMe}
                />
                <div>
                    <button className="btnUpdate" onClick={this.uploadAvatar}>
                        Guardar
                    </button>
                    <button className="btnback" onClick={ () => {this.props.history.push('/chat')}}>
                        Regresar
                    </button>
                    <button className="btnback" onClick={ () => {this.props.history.push('/chart')}}>
                        Estadisticas
                    </button>
                    <button className="btnback" onClick={ () => {this.props.history.push('/signup')}}>
                        Crear Usuarios
                    </button>
                </div>
                {this.state.isLoading ? (
                    <div> 
                        <ReactLoading 
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />
                    </div>

                ): null}
            </div>
        )
    }
}