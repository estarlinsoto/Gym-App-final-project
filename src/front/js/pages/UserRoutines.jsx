import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import { Navbar_User } from "../component/Navbar_User.jsx"



export const UserRoutines = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getRoutine()

        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes])

    return (

        <div className="bg-black">


            {store.routineData.length == 0 ? <div className="spinner-border text-danger" role="status"></div> :
                store.routineData.msg != "success" ? <div className="alert alert-warning m-5 text-center fs-1 " role="alert"><h2><b>No routine yet</b></h2></div> :

                    <div className="" >
                        <Navbar_User />
                        <div class="card text-bg-dark p-3">
                            <div class="card-header d-flex">
                                <h2 className="mx-2"><b>Routine By: </b> </h2>
                                <h2>
                                    {` ${store.routineData.trainer_first_name}  ${store.routineData.trainer_last_name}`}
                                </h2>
                            </div>
                            <div class="card-body text-center" >
                                <h3 class="card-title ">Chest</h3>
                                <p class="card-text"> {store.routineData.chest}</p>
                                <h3 class="card-title">legs</h3>
                                <p class="card-text"> {store.routineData.legs}</p>
                                <h3 class="card-title">arms</h3>
                                <p class="card-text"> {store.routineData.arms}</p>
                                <h3 class="card-title">shoulders</h3>
                                <p class="card-text"> {store.routineData.shoulders}</p>
                            </div>
                        </div>




                    </div>
            }
        </div>

    );
};
