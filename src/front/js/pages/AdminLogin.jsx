import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'
import style from "../../styles/Login.module.css"


export const AdminLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");


    const sendLoginForm = () => {
        if (password.length < 6 || !userEmail.includes("@gmail.com") || userEmail.length < 11) {
            setMsg("Please fill both inputs correctly")
            setTimeout(() => { setMsg("") }, 10000)

        }
        else {
            let user = {
                email: userEmail,
                password: password
            }
            actions.adminLogIn(user)

        }
    }

    useEffect(() => {
        if (store.loginRes == "success" && store.role == "admin") {
            navigate('/admin')

        }

        if (store.loginRes == "Incorrect password") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("Incorrect password or email")
        }

        if (store.loginRes == "this email is not registered") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("this email is not registered")
        }


    }, [store.loginRes.length, store.redirectToPaypal.length])

    return (
        <div className={`${style.container} container-fluid`}>


            <div className={style.logo_box}>
                <Link to='/' className={style.logo_login}><i class="fa-solid fa-dumbbell">_GYMApp</i></Link>
            </div>
            <div className={`${style.welcome} text-center`}>
                <p><b>Admin</b></p>
            </div>
            <div className={`${style.form_container}`}>
                {msg.length == 0 ? "" : <div class="alert alert-danger" role="alert">{msg}</div>}
                <div className={style.form_floating}>
                    <label>Email address</label>
                    <input type="email" className={style.form_control} id="email" placeholder="example@gmail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />

                </div>
                <div className={style.form_floating}>
                    <label>Password</label>
                    <input type="password" className={style.form_control} id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className={style.btn} onClick={() => sendLoginForm()}>Submit</button>
            </div>





        </div>

    )
}