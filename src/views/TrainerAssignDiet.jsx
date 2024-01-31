import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Trainer } from '../front/js/component/Navbar_Trainer.jsx'


export const TrainerAssignDiet = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [msg, setMsg] = useState("")
    const [breakfast, setBreakfast] = useState("")
    const [brunch, setBrunch] = useState("")
    const [lunch, setLunch] = useState("")
    const [dinner, setDinner] = useState("")
    const [supper, setSupper] = useState("")
    const [userId, setUserId] = useState("")
    const [alertColor, setAlertColor] = useState("")
    const [id, setID] = useState("")
    const [dietRes, setDietRes] = useState("")




    useEffect(() => {

        actions.getAllUsers()
        actions.privateViewRequestTrainer()
        if (store.privateRes === true) {
            navigate('/')
        }

        if (store.setDietRes.msg == "success") {
            setAlertColor('alert alert-success')
            setMsg('Diet added successfully!!')
            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.setDietRes.msg == "user already have diet assigned") {
            setAlertColor('alert alert-danger')
            setMsg('User already have diet assigned')
            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.setDietRes.msg == "success") {
            setAlertColor('alert alert-success')
            setMsg('Diet added successfully!!')
            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.deleteDietMsg == 'success') {
            setAlertColor('alert alert-success')
            setMsg('diet deleted!!')
            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.deleteDietMsg == 'this user not have diet') {
            setAlertColor('alert alert-danger')
            setMsg('this user not have diet')

            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }
        if (store.dietData.msg == 'this user not have diet assigned') {
            setDietRes('this user not have diet assigned')

            setTimeout(() => {
                setMsg("")
                setAlertColor("")
            }, 5000)
        }



    }, [store.privateRes, store.setDietRes.length, store.deleteDietMsg.length])

    const sendDiet = () => {
        if (breakfast.length == 0 || brunch.length == 0 || lunch.length == 0 || dinner.length == 0 || supper.length == 0) {
            setMsg("Please fill all inputs")
            setAlertColor('')
            setTimeout(() => {
                setMsg("")
                setAlertColor('alert alert-danger')
            }, 5000)
        } else {

            let diet = {
                breakfast: breakfast,
                brunch: brunch,
                lunch: lunch,
                dinner: dinner,
                supper: supper,
                id_user: userId
            }

            actions.assignDiet(diet)
            setBreakfast("")
            setBrunch("")
            setLunch("")
            setDinner("")
            setSupper("")
            setUserId("")

        }

    }
    return (

        <div className="container-fluid bg-black ">
            {store.privateRes !== "success" ? <div className="spinner-border" role="status"></div> :
                <div>
                    <Navbar_Trainer />

                    {msg.length == 0 ? "" : <div className={`${alertColor} text-center fs-3 mx-5`} role="alert"><b>{msg}</b></div>}

                    <div className="d-flex p-5 row justify-content-center">
                        {store.adminUserData.length == 0 ?
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : store.adminUserData.map((ele, index) =>
                                <div className="m-2 card col-md-6 col-sm-12 col-lg-3">
                                    <div className="bg m-3  text-center" id={ele.id}>
                                        <div className="card-body " >
                                            <h6 className="card-title"><b>First name</b> {ele.first_name}</h6>
                                            <h6 className="card-text"><b>Last Name</b> {ele.last_name}</h6>
                                            <h6 className="card-text"><b>Email:</b> {ele.email}</h6>
                                            <h6 className="card-text"><b>Since :</b> {ele.create_at}</h6>

                                            <button onClick={() => setUserId(ele.id)} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                                Assign Diet
                                            </button>

                                            <button type="button" onClick={() => setID(ele.id)} className="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#Delete" >
                                                Delete Diet
                                            </button>

                                            <button type="button" onClick={() => actions.getOneDiet(ele.id)} className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#seeDiet">
                                                See Diet
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="modal fade" id="Delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                </div>
                                <h2><b>Are you sure you want to delete this diet?</b></h2>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => actions.deleteDiet(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="seeDiet" tabindex="-1" aria-labelledby="modalSeedDiet" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header text-center">

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <h2 className=" fs-1 text-center" ><b>Diet</b></h2>
                                {store.dietData.length == 0 ? <div class="d-flex justify-content-center"><div className="spinner-border m-5" role="status"></div> </div> :
                                    store.dietData.msg == "this user not have diet assigned" ? <div className="alert alert-warning m-3 text-center" role="alert">
                                        <b>This user not have diet assigned</b>
                                    </div>
                                        :
                                        <div className="modal-body text-center">
                                            <h1><b>Diet assigned by</b></h1>
                                            <h1> {`${store.dietData.trainer_first_name} ${store.dietData.trainer_last_name}`}</h1>
                                            <h2><b>breakfast</b></h2>
                                            <h2>{store.dietData.breakfast}</h2>
                                            <h2>brunch</h2>
                                            <h2>{store.dietData.brunch}</h2>
                                            <h2><b>lunch</b></h2>
                                            <h2>{store.dietData.lunch}</h2>
                                            <h2>dinner</h2>
                                            <h2>{store.dietData.dinner}</h2>
                                            <h2>supper</h2>
                                            <h2>{store.dietData.supper}</h2>

                                        </div>
                                }
                                <div className="modal-footer">
                                    <button type="button" className=" w-100 btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>

                            </div>

                        </div>
                    </div>

                    {
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <h2 className="text-center"><b>Add diet</b></h2>
                                    <div className="modal-body">

                                        {msg.length == 0 ? "" : <div class={`${alertColor} text-center`} role="alert"><b>{msg}</b></div>}
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} ></input>
                                            <label>Breakfast</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={brunch} onChange={(e) => setBrunch(e.target.value)} ></input>
                                            <label >Brunch</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={lunch} onChange={(e) => setLunch(e.target.value)} ></input>
                                            <label >Lunch</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={dinner} onChange={(e) => setDinner(e.target.value)} ></input>
                                            <label >Dinner</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={supper} onChange={(e) => setSupper(e.target.value)} ></input>
                                            <label >Supper</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer justify-content-center">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" onClick={() => sendDiet()} >Assign Diet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>}
        </div>

    );
};
