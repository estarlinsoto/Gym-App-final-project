import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar } from "../front/js/component/Navbar.jsx";

export const ConfirmPayment = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => { actions.get_payment() }, 5000)

        if (store.paymentIdRes == 'success') {
            navigate('/login')
            localStorage.removeItem('email')
        }

    }, [store.paymentIdRes.length])



    return (

        <div className={` bg-black `}>
            {console.log(localStorage.getItem('email'))}
            <Navbar />

            <div className=" p-5 container">
                <div className="d-flex justify-content-center p-5">
                    <h1 className="p-5 m-5">
                        we confirming your payment wait a momment...
                        <div className="spinner-border text-success fs-1" role="status"></div>
                    </h1>

                </div>
                <h2 className="text-white text-center p-5 m-5">
                    We send email confirmation at your email when your account is activated
                </h2>
            </div>

        </div>


    );
};