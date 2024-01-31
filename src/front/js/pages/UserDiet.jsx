import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import { Navbar_User } from "../component/Navbar_User.jsx";
import  style  from "../../styles/userDiet.module.css";



export const UserDiet = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getDiet()

        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes])

    return (

        <div className={`bg-black ${style.container}`}>
            <Navbar_User />
            {store.dietDataUser.length == 0 ? 
            <div className="d-flex justify-content-center p-5 m-5 mh-100">
                <div className="spinner-border text-danger m-5 p-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :

                store.dietDataUser.msg != "success" ? <div className={`${style.alert} alert alert-warning p-5 mh-100 text-center fs-1`} role="alert">
                     <h2><b>No diet yet</b></h2>
                </div> :

                    <div className="" >

                        <div class="card text-bg-dark p-3">
                            <div class="card-header d-flex">
                                <h2 className="mx-2"><b>Diet By: </b> </h2>
                                <h2> {` ${store.dietDataUser.trainer_first_name} 
                                 ${store.dietDataUser.trainer_last_name}`}
                                </h2>
                            </div>

                            <div class="card-body text-center" >
                                <h3 class="card-title ">breakfast</h3>
                                <p class="card-text"> {store.dietDataUser.breakfast}</p>
                                <h3 class="card-title">brunch</h3>
                                <p class="card-text"> {store.dietDataUser.brunch}</p>
                                <h3 class="card-title">lunch</h3>
                                <p class="card-text"> {store.dietDataUser.lunch}</p>
                                <h3 class="card-title">dinner</h3>
                                <p class="card-text"> {store.dietDataUser.dinner}</p>
                                <h3 class="card-title">supper</h3>
                                <p class="card-text"> {store.dietDataUser.supper}</p>
                            </div>
                        </div>
                    </div>
            }
        </div>

    );
};
