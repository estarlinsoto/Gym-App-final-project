import React from 'react'
import style from '../../src/front/styles/Admin.module.css'
import { Navbar } from '../front/js/component/Navbar.jsx'
import { Link } from 'react-router-dom'


const Admin = () => {
    return (
        <div>
            <Navbar />

            <admin className="">
                <div className={style.services}>
                    <h1>See what the hype is about</h1>
                    <div className={style.services__container}>
                        <Link to='/'>
                            <div className={style.services__card}>
                                <h2>Experience Fitness</h2>
                                <p>Best Technology Gym</p>
                                {/* <button>Get Started</button> */}
                            </div>
                        </Link>
                        <div className={style.services__card}>

                            <h2>Are You Ready</h2>
                            <p>Take The Challenge</p>
                            {/* <button>Get Started</button> */}
                        </div>
                        <div className={style.services__card}>

                            <h2>Transform Yourself</h2>
                            <p>Get Motivated</p>
                            {/* <button>Get Started</button> */}
                        </div>
                    </div>
                    
                </div>
            </admin>
        </div>


    )
}

export default Admin