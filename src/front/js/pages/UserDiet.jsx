import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import { Navbar_User } from "../component/Navbar_User.jsx";



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

        <div className="bg-black">
            {store.dietDataUser.length == 0 ? <div className="spinner-border text-danger" role="status"></div> :
                store.dietDataUser.msg != "success" ? <div className="alert alert-warning m-5" role="alert">No routine yet</div> :

                    <div className="" >
                        <Navbar_User />
                        <div class="card text-bg-dark p-3">
                            <div class="card-header d-flex">
                                <h2 className="mx-2"><b>Diet By: </b> </h2>
                                <h2> {` ${ store.dietDataUser.trainer_first_name} 
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
