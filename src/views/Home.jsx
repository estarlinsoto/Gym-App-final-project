import React from 'react'
import style from '../../src/front/styles/Home.module.css'
import { Navbar } from '../front/js/component/Navbar.jsx'

import { useNavigate } from "react-router-dom";




const Home = () => {
    const navigate = useNavigate();
    return (

        <div className=''>
            <Navbar />



            <div className={style.main}>
                <div className={style.main__container}>
                    <div className={style.main__content}>
                        <h1>NEXT GENERATION GYM</h1>
                        <h2>TECHNOLOGY</h2>
                        <p>See what makes us different.</p>
                        <button className={style.main__btn}><a href="/signup">Get Started</a></button>
                    </div>
                    <div className={style.main__img__container}>
                        <img src="https://images.pexels.com/photos/5384000/pexels-photo-5384000.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" id={style.main__img} />
                    </div>
                </div>

            </div>
            {/*<div className='mapContainer'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15134.886272863721!2d-69.8819010128418!3d18.496267000000017!2m3!1f0!2f
                0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89137bd03f4d%3A0xf4727664bd6199dd!2sSmart%20Fit%20Ozama!5e0!3m2!1ses!2sdo!4v1705243004859!5m2!1ses!2sdo"
                    loading="lazy" className='map' referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>*/}
            <div className={style.services}>
                <h1>See what the hype is about</h1>
                <div className={style.services__container}>
                    <div className={style.services__card}>
                        <h2>Experience Fitness</h2>
                        <p>Best Technology Gym</p>
                        <button onClick={() => navigate('/signup')}>Get Started</button>
                    </div>
                    <div className={style.services__card}>

                        <h2>Are You Ready</h2>
                        <p>Take The Challenge</p>
                        <button onClick={() => navigate('/signup')}>Get Started</button>
                    </div>
                    <div className={style.services__card}>

                        <h2>Transform Yourself</h2>
                        <p>Get Motivated</p>
                        <button onClick={() => navigate('/signup')}>Get Started</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home