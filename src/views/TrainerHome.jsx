import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Trainer } from '../front/js/component/Navbar_Trainer.jsx'

export const TrainerHome = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        actions.privateViewRequestTrainer()
        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes])


    return (

        <div className={`${style.services} container-fluid bg-black `}>
            {store.privateRes !== "success" ? <div className="spinner-border" role="status"></div> :
                <div>
                    <Navbar_Trainer />

                    <div className={style.services__container__trainer}>
                        <div className={style.services__card}>
                            <Link to="/trainer/assignroutine">
                                <h2>Assign Routine</h2>
                                <p></p>
                            </Link>
                        </div>
                        <div className={style.services__card}>
                            <Link to="/trainer/assigndiet">
                                <h2>Assign Diet</h2>
                                <p></p>
                            </Link>
                        </div>

                    </div>
                </div>}
        </div>

    );
};
