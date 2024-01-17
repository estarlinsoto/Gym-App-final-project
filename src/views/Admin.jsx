import React from 'react'
import style from '../../src/front/styles/Admin.module.css'
import { Navbar_Admin } from '../front/js/component/Navbar_Admin.jsx'
import { Link } from 'react-router-dom'




const Admin = () => {
    return (
        <div>
            <Navbar_Admin />

            <admin className="">
                <div className={style.services}>
                    <h1>Administrators can manage Users, Trainers and Finances from here.</h1>
                    <div className={style.services__container}>
                        <Link to='/admin/users' className={style.services__card}>
                            <h2>Manage your Users</h2>
                        </Link>
                        <Link to='/admin/trainers' className={style.services__card}>
                            <h2>Manage your Trainers</h2>
                        </Link>
                        <Link to='/admin/finances' className={style.services__card} Manage your Finances >
                            <h2>Manage your Finances</h2>
                        </Link>
                    </div>
                </div>
            </admin>
        </div>


    )
}

export default Admin