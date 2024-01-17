import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'
import style from "../../styles/Login.module.css"


export const TrainerLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");


    const sendLoginForm = () => {
        if (password.length < 6 || !email.includes("@gmail.com") || email.length < 11) {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("Please fill both inputs correctly")

        }
        else {
            actions.trainerLogIn(email, password)
        }
    }

    useEffect(() => {

        if (store.loginTrainerRes == "success" && store.role == "trainer") {
            navigate('/trainer')

        }

        if (store.loginTrainerRes == "Incorrect password") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("Incorrect password or email")
        }

    }, [store.loginTrainerRes])

    return (
        <div className={` ${style.container} container-fluid`}>

            <div className={style.logo_box}>
                <Link to='/' className={style.logo_login}><i class="fa-solid fa-dumbbell">_GYMApp</i></Link>
            </div>


            <h1 className='text-center'><b>Login</b></h1>
            <div className='row'>
                <div className={`${style.form_container_trainer} px-5`}>
                    {msg.length == 0 ? "" : <div class="alert alert-danger text-center" role="alert">{msg}</div>}
                    <h1 className='text-center'><b>Welcome Trainer</b></h1>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control " id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control " id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <div className='text-center'>
                        <button className="btn btn-dark w-50 p-2" onClick={() => sendLoginForm()}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}