import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import '../../Pages/Home/Home.css';
import images from '../../ProjectImages/ProjectImages';
import { Link } from 'react-router-dom';


export default class HomePage extends Component{

    render(){
        return(
         <div>
            <Header />
            <div class="splash-container">
                <div className="splash">
                    <h1 class="splash-head">Bullying Chat App</h1>
                    <p class="splash-subhead">
                        Cuentanos que pasa
                    </p>

                    <div id="custom-button-wrapper">
                        <Link to="/login">
                            <a class="my-super-cool-btn">
                                <div class="dots-container">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>

                                </div>
                                <span className="buttoncooltext">Inicia una conversación</span>
                            </a>
                        </Link>
            
                    </div>
                </div>
            </div>

            <div class="content-wrapper">
                <div class="content">
                    <h2 class="content-head is-center">La evolución de un acoso escolar</h2>


                    <div className="Appfeatures">
                        <div className="contenthead">

                            <h3 class="content-subhead"> 
                                Maltrato
                            </h3>
                            <p>
                                Suele comenzar casi siempre de manera repentina<br></br> 
                                con un cambio brusco en la relacion entre <br></br>el niño acosador y
                                el niño objetivo de acoso.
                            </p>
                        </div>

                        <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 class="content-subhead"> 
                                Frecuencia
                            </h3>
                            <p>
                                Firebase Authentication has been implemented in this app
                            </p>
                        </div>

                        <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 class="content-subhead"> 
                                Duración
                            </h3>
                            <p>
                                You can share imagen with your friends for better experience
                            </p>
                        </div>

                        <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 class="content-subhead"> 
                                Daños Permanentes
                            </h3>
                            <p>
                                We will working with new features for this app for better experience in future
                            </p>
                        </div>

                    </div>
                </div>

                <div class="AppfeaturesFounder">
                    <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                        <img width="300" alt="File Icons" class="pure-img-responsive" src={images.bullying} />
                    </div>

                    <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
                        <h2 class="content-head content-head-ribbon">Bullying</h2>

                        <p style={{color:'white'}}>
                            Es cualquier forma de maltrato psicológico, verbal o físico producido entre estudiantes de forma reiterada a lo largo de un tiempo determinado tanto en el aula.
                        </p>
                    </div>

                </div>        


                <div class="AppfeaturesFounder">
                    <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                        <img width="300" alt="File Icons" class="pure-img-responsive" src={images.ciberbullying} />
                    </div>

                    <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
                        <h2 class="content-head content-head-ribbon">Ciberbullying</h2>

                        <p style={{color:'white'}}>
                            Es el uso de medios digitales para molestar o acosar a una persona o grupo de personas mediante ataques personales, divulgación de información confidencial o falsa entre otros medios.
                        </p>
                    </div>

                </div>        
            </div>
         </div> 
         
         
        )
    
    }
}