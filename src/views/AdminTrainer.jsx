import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Admin } from '../front/js/component/Navbar_Admin.jsx'


export const AdminTrainer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {

        actions.getAllTrainers()
        actions.privateViewRequestAdmin()

        if (store.newTrainerRes == "Email already exists.") {
            setAlertColor("alert alert-danger")
            setMsg("Email already exists.")


            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.newTrainerRes == "success") {
            setAlertColor("alert alert-success")
            setMsg("trainer added correctly")


            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }

        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.newTrainerRes.length, store.privateRes.length])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [msg, setMsg] = useState("")
    const [alertColor, setAlertColor] = useState('')
    const [id, setId] = useState(0)

    const sendForm = () => {
        let emailInput = email
        emailInput = emailInput.toLocaleLowerCase()

        if (password.length < 6 || !emailInput.includes("@gmail.com") || emailInput.length < 11 || lastName.length < 3 || firstName.length < 3) {
            setMsg("the password or the email not meets the registration requirements.")
            setAlertColor("alert alert-danger")
            setTimeout(() => { setMsg("") }, 5000)

        } if (password !== password2) {
            setAlertColor("alert alert-danger")
            setTimeout(() => { setMsg("") }, 10000)
            return setMsg("Passwords do not match")

        } else {

            let newTrainer = {
                email: emailInput,
                password: password,
                first_name: firstName,
                last_name: lastName,
                pathologies: "pathologiesgdfg",
                date_of_birth: "1151515",
                role: "trainer"


            }

            actions.createNewTrainer(newTrainer)
            setEmail('')
            setPassword('')
            setPassword('')
            setFirstName('')
            setLastName('')

        }
    }




    return (

        <div className="container-fluid bg-black justify-content-center">
            {store.privateRes !== "success" ? <div className="spinner-border" role="status"></div> :
                <div>
                    <Navbar_Admin />
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header ">
                                    <p className="modal-title fs-5 " id="staticBackdropLabel">Add new trainer here!!</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {
                                        <div className="m-5">

                                            {msg.length == 0 ? "" : <div className={alertColor} role="alert">{msg}</div>}

                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} ></input>
                                                <label >First Name</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} ></input>
                                                <label >Last Name</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required ></input>
                                                <label >Email address</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                                                <label for="floatingPassword">Password</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" placeholder="Password" value={password2} onChange={(e) => setPassword2(e.target.value)} ></input>
                                                <label for="floatingPassword">Confirm Password</label>
                                            </div>

                                            <button type="button" className="btn btn-success w-100 py-2" onClick={() => sendForm()}>Add new trainer</button>

                                            <div className="text-center my-2">
                                                <h5>Requirements for registration:</h5>
                                                <h6>Password must be minimum length of 6</h6>
                                                <h6>Only accept Gmail</h6>
                                            </div>
                                        </div>


                                    }
                                </div>
                                <div class="modal-footer">
                                    <button type="button" className="btn btn-danger w-100" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center" >
                        <button type="button" className=" btn btn-warning w-50 p-2 fs-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add new trainer
                        </button>
                    </div>

                    <div className="d-flex row p-5 justify-content-center ">
                        {store.adminTrainerData.length == 0 ?
                            <div className="spinner-border text-danger text-center" role="status">
                            </div> : store.adminTrainerData.msg == "no trainers in db :(" ?
                                <div className="alert alert-warning text-center" role="alert"><h1><b>no trainers in db yet</b></h1></div> :
                                store.adminTrainerData.map((ele, index) =>
                                    <div className="  m-2 card col-md-6 col-sm-12 col-lg-3" id={index}>
                                        <div className="card-body text-center" >
                                            <h6 className="card-title"><b>First name</b></h6>
                                            <h6>{ele.first_name}</h6>
                                            <h6 className="card-text"><b>Last Name</b> </h6>
                                            <h6>{ele.last_name}</h6>
                                            <h6 className="card-text"><b>Email</b> </h6>
                                            <h6>{ele.email}</h6>
                                            <h6 className="card-text"><b>Since</b> </h6>
                                            <h6>{ele.create_at}</h6>
                                        </div>


                                        <div className="card-body text-center">
                                            <button type="button" className="btn btn-danger w-50" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => setId(ele.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                    </div>
                    <div className="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">are sure you want delete this trainer?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" onClick={() => actions.deleteTrainer(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}
        </div>
    );
};