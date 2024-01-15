import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'
import style from "../../styles/Login.module.css"


export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [redirectMsg, setRedirectMsg] = useState("");

    const sendLoginForm = () => {
        if (password.length < 6 || !userEmail.includes("@gmail.com") || userEmail.length < 11) {
            setMsg("Please fill both inputs correctly")
            setTimeout(() => { setMsg("") }, 10000)

        }
        else {
            actions.logIn(userEmail, password)
        }
    }

    useEffect(() => {
        if (store.loginRes == "success" && store.role == "user") {
            navigate('/user')

        }

        if (store.loginRes == "Incorrect password") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("Incorrect password or email")
        }

        if (store.loginRes == "user not pay, redirecting to paypal") {
            setRedirectMsg("User not pay, redirecting to paypal...")
        }

        if (store.loginRes == "this email is not registered") {
            setTimeout(() => { setMsg("") }, 10000)
            setMsg("this email is not registered")
        }
        if (store.redirectToPaypal.length > 0) {
            setTimeout(() => navigate(window.location.href = store.redirectToPaypal), 5000)

        }


    }, [store.loginRes.length, store.redirectToPaypal.length])

    return (
        <div className={`${style.container} container-fluid`}>


            <div className={style.logo_box}>
                <Link to='/' className={style.logo_login}><i class="fa-solid fa-dumbbell">_GYMApp</i></Link>
            </div>
            <div className={style.welcome}>
                <p>Welcome to your best workout</p>
            </div>
            <div className={style.form_container}>


                <div className={style.form_floating}>
                    {msg.length == 0 ? "" : <div class="alert alert-danger" role="alert">{msg}</div>}
                    {redirectMsg.length == 0 ? "" :
                        <div class="alert alert-warning" role="alert">
                            User not pay, redirecting to paypal...
                            <div className="spinner-border text-light mx-2" role="status">
                            </div>
                        </div>


                    }
                    <label>Email address</label>
                    <input type="email" className={style.form_control} id="email" placeholder="example@gmail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />

                </div>
                <div className={style.form_floating}>
                    <label>Password</label>
                    <input type="password" className={style.form_control} id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className={style.btn} onClick={() => sendLoginForm()}>Submit</button>

                <div className={style.m_3}>
                    <Link className={style.text_danger} to="/signup">Not registered?</Link>
                </div>
            </div>





        </div>

    )
}