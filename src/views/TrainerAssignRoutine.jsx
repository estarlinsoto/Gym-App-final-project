import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'
import { Navbar_Trainer } from "../front/js/component/Navbar_Trainer.jsx";

export const TrainerAssignRoutine = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [msg, setMsg] = useState("")
    const [chest, setChest] = useState("")
    const [arms, setArms] = useState("")
    const [legs, setLegs] = useState("")
    const [shoulders, setShoulders] = useState("")
    const [userId, setUserId] = useState("")
    const [id, setId] = useState("")


    useEffect(() => {

        actions.getAllUsers()
        actions.privateViewRequestTrainer()

        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes.length])

    const sendRoutine = () => {
        if (chest.length == 0 || arms.length == 0 || legs.length == 0 || shoulders.length == 0) {
            setMsg("Please fill all inputs")
        } else {

            let routine = {
                chest: chest,
                arms: arms,
                legs: legs,
                shoulders: shoulders,
                id_user: userId
            }

            actions.assignRoutine(routine)
            setArms("")
            setChest("")
            setShoulders("")
            setLegs("")
            

        }

    }
    return (

        <div className="container-fluid bg-black justify-content-center">
            {store.privateRes !== "success" ? <div className="spinner-border " role="status"></div> :
                <div>
                    <Navbar_Trainer />
                    {store.deleteRoutineMsg == "success" ? <div className="alert alert-success text-center fs-5 m-2" role="alert"><b>routine deleted!!</b></div> :
                        store.deleteRoutineMsg == "this user not have routines" ?
                            <div className="alert alert-danger text-center fs-5 w-100" role="alert">
                                <b>this user not have routines</b></div> : ""}

                    <div className="d-flex p-5 row justify-content-center">

                        {store.adminUserData.length == 0 ?
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : store.adminUserData.map((ele, index) =>
                                <div className="m-2 col-md-6 col-sm-12 col-lg-3">
                                    <div className=" card text-center" id={ele.id}>
                                        <div className="card-body " >
                                            <h6 className="card-title"><b>First name</b></h6>
                                            <h6> {ele.first_name}</h6>
                                            <h6 className="card-text"><b>Last Name</b></h6>
                                            <h6>{ele.last_name}</h6>
                                            <h6 className="card-text"><b>Email</b></h6>
                                            <h6>{ele.email}</h6>
                                            <h6 className="card-text"><b>Since</b></h6>
                                            <h6>{ele.create_at}</h6>

                                            <button onClick={() => setUserId(ele.id)} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                                Assign Routine
                                            </button>
                                            <button type="button" onClick={() => setId(ele.id)} className="btn btn-danger my-2 mx-1" data-bs-toggle="modal" data-bs-target="#Delete" >
                                                Delete Routine
                                            </button>
                                            <button onClick={() => actions.getOneRoutine(ele.id)} type="button" className="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                See Routine
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
                                <h2><b>Are you sure you want to delete this routine?</b></h2>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => actions.deleteRoutine(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header text-center">

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <h2 className=" fs-1 text-center" ><b>Routine</b></h2>
                                {store.routineDataTrainer.length == 0 ? <div class="d-flex justify-content-center"><div className="spinner-border m-5" role="status"></div> </div> :
                                    store.routineDataTrainer.msg == "this user not have routine assigned" ? <div className="alert alert-warning m-3 text-center" role="alert">
                                        <b>This user not have routine assigned</b>
                                    </div>
                                        : <div className="modal-body text-center">
                                            <h1><b>Diet assigned by</b></h1>
                                            <h1>{`${store.routineDataTrainer.trainer_first_name} ${store.routineDataTrainer.trainer_last_name}`}</h1>
                                            <h2><b>Chest</b></h2>
                                            <h2>{store.routineDataTrainer.Chest}</h2>
                                            <h2><b>Shoulders</b></h2>
                                            <h2>{store.routineDataTrainer.shoulders}</h2>
                                            <h2><b>Arms</b></h2>
                                            <h2>{store.routineDataTrainer.arms}</h2>
                                            <h2><b>legs</b></h2>
                                            <h2>{store.routineDataTrainer.legs}</h2>
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
                                    <h2 className="modal-title fs-5 text-center" id="staticBackdropLabel"><b>Assign Routine</b></h2>
                                    <div className="modal-body">
                                        {store.setRoutineRes.length == 0 ? "" : <div className="alert alert-success col-12 " role="alert">routine added successfully!!</div>}
                                        {msg.length == 0 ? "" : <div class="alert alert-danger" role="alert">{msg}</div>}
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={chest} onChange={(e) => setChest(e.target.value)} ></input>
                                            <label >chest exercise</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={arms} onChange={(e) => setArms(e.target.value)} ></input>
                                            <label >Arms exercise</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={legs} onChange={(e) => setLegs(e.target.value)} ></input>
                                            <label >Legs exercise</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" value={shoulders} onChange={(e) => setShoulders(e.target.value)} ></input>
                                            <label >Shoulders exercises</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" onClick={() => sendRoutine()} >Assign routine</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>}
        </div>

    );
};
