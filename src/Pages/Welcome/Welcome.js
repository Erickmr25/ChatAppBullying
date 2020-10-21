import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../../Pages/Welcome/Welcome.css';

export default class WelcomeCard extends React.Component {
    render() {
        return (
            <div className="viewWelcomeBoard">
                <img 
                    className="avatarWelcome"
                    src={this.props.currentUserPhoto}
                    alt=""
                />
                <span className="textTileWelcome">{`Bienvenid@, ${this.props.currentUserName}`}</span>
                <span className="textDescriptionWelcome">
                    Empieza a chatear y cuentanos que pasa.
                </span>
            </div>
        )
    }
}