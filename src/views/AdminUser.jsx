import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Admin } from '../front/js/component/Navbar_Admin.jsx'


export const AdminUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [id, setId] = useState(0)

    useEffect(() => {

        actions.getAllUsers()
        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes])



    return (

        <div className="container-fluid bg-black ">
        
            <div className="d-flex p-5 row align-middle">
                {store.adminUserData.length == 0 ?
                    <div className="spinner-border text-danger" role="status"></div> : 
                    store.adminUserData.map((ele, index) =>
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
                                <h6 className="card-text"><b>payment status</b></h6>
                                {ele.pay !== "success" ? <h6 className="text-danger fw-semibold">Not suscribed</h6> : <h6 className="text-success fw-semibold">Suscribed</h6>}
                            </div>

                            <div className="card-body text-center">

                                <button type="button" className="btn btn-danger w-100 my-2" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => setId(ele.id)}>
                                    Delete
                                </button>
                                <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Edit user information
                                </button>
                            </div>

                        </div>
                    )}

            </div>
            <div className="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">are sure you want delete this user?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => actions.deleteUser(id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};