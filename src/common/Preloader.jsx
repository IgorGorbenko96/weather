import React from 'react';
import '../App.css';
import preloader from '../assets/images/preloader.gif'

const Preloader = () => {
    return (
        <div className="preloader">
            <img src={preloader} alt="preloader"/>
        </div>
    )
}

export default Preloader;