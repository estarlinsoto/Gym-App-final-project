import React from 'react'
import style from '../../src/front/styles/Home.module.css'
import { Navbar } from '../front/js/component/Navbar.jsx'
import { Link } from 'react-router-dom'


const Home = () => {
    return (

        <div>
            <Navbar />

            <home className="">
                <div className={style.main}>
                    <div className={style.main__container}>
                        <div className={style.main__content}>
                            <h1>THE NEXT GENERATION GYM</h1>
                            <h2>JOIN THE REVOLUTION</h2>
                            <p>Take the challenge that will change your life.</p>
                            <Link to='/signup'>
                            <button className={style.main__btn}><a>Get Started</a></button>
                            </Link>
                        </div>
                        <div className={style.main__img__container}>
                            <img src="https://images.pexels.com/photos/5384000/pexels-photo-5384000.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" id={style.main__img} />
                        </div>
                    </div>
                </div>

                
                <div className={style.services}>
                    <h1>Training, Diets and Motivation, Are You In?</h1>
                    <div className={style.services__container}>
                        <div className={style.services__card}>
                            <h2>Workout Without Limits</h2>
                            <p>Only $24.99 USD/Month</p>
                            <Link to='/signup'>
                            <button>Get Started</button>
                            </Link>
                        </div>
                        <div className={style.services__card}>
                            <h2>Start Now Your Free Trial</h2>
                            <p>Only $24.99 USD/Month</p>
                            <Link to='/signup'>
                            <button>Get Started</button>
                            </Link>
                        </div>
                        <div className={style.services__card}>
                            <h2>Transform Yourself</h2>
                            <p>Only $24.99 USD/Month</p>
                            <Link to='/signup'>
                            <button>Get Started</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </home>
        </div>
    )
}

export default Home