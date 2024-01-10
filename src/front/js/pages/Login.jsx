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


    const sendLoginForm = () => {
        if (password.length < 6 || !userEmail.includes("@gmail.com") || userEmail.length < 11) {
            setMsg("Please fill both inputs correctly")
            setTimeout(()=> {setMsg("")}, 5000)

        }
        else {
            actions.logIn(userEmail, password)
        }
    }

    useEffect(() => {
        if (store.loginRes == "success" && store.role == "admin") {
            navigate('/admin')
        }

        if (store.loginRes == "success" && store.role == "user") {
            navigate('/user')

        }

        if (store.loginRes == "Incorrect password" || store.loginRes == "this email is not registered") {
            setTimeout(()=> {setMsg("")}, 5000)
            setMsg("Incorrect password or email")
           
        }

    }, [store.loginRes])

    return (
        <div className={`${style.container} container-fluid`}>
            
           
                <div className={style.logo_box}>
                    <Link to='/' className={style.logo_login}><i class="fa-solid fa-dumbbell">_GYMApp</i></Link>
                </div>
                <div className={style.welcome}>   
                    <p>Welcome to your best workout</p>
                </div>
                <div className={style.form_container}>
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

                    <div className={style.m_3}>
                        <Link className={style.text_danger} to="/signup">Not registered?</Link>
                    </div>
                </div>
            </div>
        
    )
}