import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/Signup/SignUp.css';
import { Card } from 'react-bootstrap';
import firebase from '../../Services/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LoginString from '../Login/LoginStrings';

export default class Signup extends Component{
    constructor() {
        super();
            this.state = {
                email: "",
                password: "",
                name: "",
                error: null
            }
            this.handlechange = this.handlechange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
    }
    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }    

    async handleSubmit(event) {
        const { name, password, email } = this.state;
        event.preventDefault();
        
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async result => {
                firebase.firestore().collection('users')
                .add({
                    name,
                    id: result.user.uid,
                    email,
                    password,
                    URL: '',
                    description: '',
                    messages:[{ notificationId: "", number: 0 }]
                }).then((docRef) => {
                    localStorage.setItem(LoginString.ID, result.user.uid);
                    localStorage.setItem(LoginString.Name, name);
                    localStorage.setItem(LoginString.Email, email);
                    localStorage.setItem(LoginString.Password, password);
                    localStorage.setItem(LoginString.PhotoURL, "");
                    localStorage.setItem(LoginString.UPLOAD_CHANGED, 'state_changed');
                    localStorage.setItem(LoginString.Description, "");
                    localStorage.setItem(LoginString.FirebaseDocumentID, docRef.id);

                    this.setState({
                        name: '',
                        password: '',
                        url: ''
                    });
                    this.props.history.push("/chat")
                })
                .catch((error) => {
                    console.error("Error agregando documento", error)
                })
            })
        } catch(error){
            document.getElementById('1').innerHTML = "Error al registrarse, por favor intentelo de nuevo"
        }
    }
    render(){
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#1c5992',
            width: '100%',
            boxShadow: " 0 5px 5px #1c5992",
            height: "10rem",
            paddingTop: '48px',
            opacity: "0.5",
            boderBottom:'5px solid #1c5992',
        }

        return(
            <div>
                <CssBaseline />
                <Card style={Signinsee} >
                    <div>
                        <Typography component="h1" variant="h4" color= 'textPrimary'>
                            Registrarse
                        </Typography>
                    </div>
                    <div>
                        <Link to="/">
                            <button class="btn">WebChat</button>
                        </Link>
                    </div>
                </Card>
                <Card className="formacontrooutside">
                    <form className="customform" noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electronico-Ejemplo: usuario@gmail.com" 
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.email} 
                        />
                        

                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password" 
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.password} 
                        />

                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Tu nombre" 
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.name} 
                        />
                        <div>
                            <p style={{ color: 'grey', fontSize:'15px'}}>Contraseña: Por favor introduce una mayor a 6 caracteres</p>
                        </div>

                        <div className="CenterAliningItems">
                            <button class="button1" type="submit">
                                <span>Registrarse</span>
                            </button>
                        </div>
                        <div>
                            <p style={{color:'grey'}}>Ya tengo una cuenta?</p>
                            <Link to="/login">
                                Inicio de Sesión
                            </Link>
                        </div>
                        <div className="error">
                            <p id='1' style={{color:'red'}}></p>
                        </div>
                    </form>
                </Card>
            </div>
        )
    }
}