import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Admin } from '../front/js/component/Navbar_Admin.jsx'


export const AdminUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {

        actions.getAllUsers()
        if(store.privateRes === true){
            navigate('/')
        }

    }, [store.privateRes])



    return (

        <div className="container-fluid bg-black ">
              <Navbar_Admin />

              <div className="d-flex p-5 row align-middle">
            {store.adminUserData.length == 0 ?
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : store.adminUserData.map((ele, index) =>
                <div className="my-1 card col-md-6 col-sm-12 col-lg-4" id={index}>
                    

                        <div className="card-body text-center" >
                            <h6 className="card-title"><b>First name</b> </h6>
                            <h6>{ele.first_name}</h6>
                            <h6 className="card-text"><b>Last Name</b> </h6>
                            <h6>{ele.last_name}</h6>
                            <h6 className="card-text"><b>Email</b></h6>
                            <h6>{ele.email}</h6>
                            <h6 className="card-text"><b>Since</b></h6>
                            <h6>{ele.create_at}</h6>
                        </div>
                        
                        <div className="card-body text-center">
                            <button className="btn btn-danger w-50" onClick={()=> actions.deleteUser(ele.id)}>Delete</button>
                        </div>
                    </div>
                    
                )}
        </div>
        </div>
    );
};