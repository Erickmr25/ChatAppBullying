import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Services/firebase';

import LoginString from '../Login/LoginStrings';
import '../../Pages/Login/Login.css';
import { Card } from 'react-bootstrap';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';


export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: "",
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }  

    componentDidMount() {
        if(localStorage.getItem(LoginString.ID)) {
            this.setState({isLoading: false}, () => {
                this.setState({isLoading: false})
                this.props.showToast(1, 'Inicio de sesión correcto')
                this.props.history.push('./chat')
            })
        }else {
            this.setState({isLoading: false})
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error:""});

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async result => {
            let user = result.user;
            if(user) {
                await firebase.firestore().collection('users')
                .where('id' , "==", user.uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){
                        const currentdata = doc.data();
                        localStorage.setItem(LoginString.FirebaseDocumentID, doc.id);
                        localStorage.setItem(LoginString.ID, currentdata.id);
                        localStorage.setItem(LoginString.Name, currentdata.name);
                        localStorage.setItem(LoginString.Email, currentdata.email);
                        localStorage.setItem(LoginString.Password, currentdata.password);
                        localStorage.setItem(LoginString.PhotoURL, currentdata.URL);
                        localStorage.setItem(LoginString.Description, currentdata.description);
                    })
                })
            }
            this.props.history.push("/chat")
        }).catch(function(error) {
            this.setState({
                error: "Error al iniciar sesión, por favor intentelo de nuevo."
            })  
        })
    }

    render() {

        const paper = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px'
        }
        const rightcomponent = {
            boxShadow: "0 80px 80px #808888",
            backgroundColor: 'smokegrey',
        }

        const root = {
            height: '100vh',
            background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",

            marginBottom: '50px'
        }
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            marginBottom: '20px',
            backgroundColor: '#1c5992',
            width: '100%',
            boxShadow: "0 5px 5px #1c5992",
            height: "10rem",
            paddingTop: "48px",
            opacity: "0.5",
            borderBottom: '5px solid #1c5992'
        }

        const form = {
            width: '100%', // Fix IE 11 issue.
            marginTop: '50px'
        }
        const avatar = {
            backgroundColor: '#b4c6ee',
        }
        return(
            <Grid container component="main" style={root}>
                <CssBaseline />
                <Grid item xs={1} sm={4} md={7} className="image">
                    <div className="image1"></div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6} square>
                    <Card style={Signinsee}>
                        <div>
                            <Avatar style={avatar}>
                                <LockOutlinedIcon width="50px" height="50px"/>
                            </Avatar>
                        </div>
                        <div>
                            <Typography component="h1" variant="h5"
                                Sign in
                                To
                            />
                        </div>
                        <div>
                            <Link to="/">
                                <button class="btn">
                                    ChatApp
                                </button>
                            </Link>
                        </div>
                    </Card>
                    <div style={paper}>
                        <form style={form} noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electronico" 
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.email} 
                            />

                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Contraseña" 
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.password} 
                            />
                            <FormControlLabel 
                                control={<Checkbox value="remenber" color="primary" />}
                                label="Recuendame"
                            />
                            <Typography component="h6" variant="h5">
                                {this.state.error ? (
                                    <p className="text-danger">{this.state.error}</p>
                                ): null}
                            </Typography>


                                <div className="CenterAliningItems">
                                    <button className="button1" type="submit">
                                        <span>Iniciar sesión</span>
                                    </button>
                                </div>

                                <div className="CenterAliningItems">
                                    <p>No tienes una cuenta?</p>
                                    <Link to="/signup" variant="body2">
                                        Registrate
                                    </Link>
                                </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}