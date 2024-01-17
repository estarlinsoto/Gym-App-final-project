import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Admin } from '../front/js/component/Navbar_Admin.jsx'


export const AdminUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [id, setId] = useState(0)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {

        actions.getAllUsers()
        actions.privateViewRequestAdmin()
        if (store.privateRes === true) {
            navigate('/')
        }

        if (store.editUserRes == 'success') {
            setMsg('user edited successfully')
            setTimeout(() => { setMsg('') }, 5000)
        }

        setEmail(store.getUser.email)
        setFirstName(store.getUser.first_name)
        setLastName(store.getUser.last_name)
        setId(store.getUser.id)



    }, [store.privateRes.length, store.getUser.length, store.editUserRes.length])

    const sendForm = () => {
        let emailInput = email
        emailInput = emailInput.toLocaleLowerCase()

        if (!emailInput.includes("@gmail.com") || emailInput.length < 11 || lastName.length < 3 || firstName.length < 3) {



        } else {

            let editInformation = {
                email: emailInput,
                first_name: firstName,
                last_name: lastName,
                id: id


            }

            actions.editUser(editInformation)
            setEmail('')
            setFirstName('')
            setLastName('')

        }
    }


    return (

        <div className="container-fluid bg-black justify-content-center">
            {store.privateRes !== "success" ? <div className="spinner-border" role="status"></div> :
                <div>
                    <Navbar_Admin />
                    {msg.length == 0 ? "" : <div className={`alert alert-success text-center fs-3 mx-5`} role="alert"><b>{msg}</b></div>}
                    <div className="d-flex p-5 row justify-content-center">
                        {store.adminUserData.length == 0 ? <div className="spinner-border text-danger" role="status"></div> :
                            store.adminUserData.msg == "no user in db" ?
                                <div className="alert alert-warning text-center" role="alert"><h1><b>no user in db yet</b></h1></div> :
                                store.adminUserData.map((ele, index) =>
                                    <div className="m-2 card col-md-6 col-sm-12 col-lg-3" id={index}>

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
                                            <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => actions.getOneUser(ele.id)}>
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
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => actions.deleteUser(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="text-center"><h1><b>Edit user</b></h1></div>
                                {store.getUser.length == 0 ? <div class="spinner-border" role="status"></div> :
                                    <div className="modal-body">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} ></input>
                                            <label >First Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="First Name" value={lastName} onChange={(e) => setLastName(e.target.value)} ></input>
                                            <label >Last Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="First Name" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                                            <label >Email</label>
                                        </div>
                                    </div>}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => sendForm()}>Confirm</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>}
        </div>
    );
};