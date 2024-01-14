import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Admin } from "../front/js/component/Navbar_Admin.jsx"

export const AdminView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.privateViewRequestAdmin()
        if (store.privateRes === true || sessionStorage.access_token == "") {
            navigate('/')
        }

    }, [store.privateRes.length])



    return (

        <div className={`${style.services} container-fluid bg-black`}>
            {store.privateRes !== "success" ? <div className="spinner-border" role="status"></div> :
                <div>
                    <Navbar_Admin />
                    <div className={style.services__container}>
                        <div className={style.services__card}>
                            <Link to="/admin/users">
                                <h2>Your Clients</h2>
                                <p>Here you can delete users</p>
                            </Link>
                        </div>
                        <div className={style.services__card}>
                            <Link to="/admin/trainer">
                                <h2>Your Trainers</h2>
                                <p>Here you can delete users</p>
                            </Link>
                        </div>
                    </div>
                </div>}
        </div>


    );
};