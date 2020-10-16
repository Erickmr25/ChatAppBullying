import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    Copyright = () => {
        return (
            <h5 variant="body2" color="text-Secondary" align="center">
            {'Copyright ©'}

            {'  '}

            {'Erick Lopez'}

            {'   '}

            {new Date().getFullYear()}
            
           {'.'}
        </h5>
        )
    }

    render(){
        return(
            <>
                <div class="footer 1-box is-center">
                    {this.Copyright()}
                </div>
            </>    
        )
    }
}

export default Footer