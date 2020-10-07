import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <header className="header-login-signup">
            <div className="header-limiter">
                <h1><a href="/">Bullying y<span> Ciberbullying</span></a></h1>
                <nav>
                    <Link to="/">Inicio</Link>
                    <a className="selected"><Link to="/">Acerca de la App</Link></a>
                    <a><Link to="/">Contáctanos</Link></a>
                </nav>
                <ul>
                    <li><Link to="/login">Inicio de sesión</Link></li>
                    <li><Link to="/signup">Regístrate</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header