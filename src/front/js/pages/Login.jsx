import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'
import style from "../../styles/Login.module.css"


export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleClick = () => {
        actions.logIn(userEmail, password)
    }

    useEffect(() => {
        if (store.loginRes == "Success") {
            navigate('/user')
        }
    }, [store.loginRes])

    return (
        <div className={style.container}>
            <div>
                <div className={style.logo_box}>
                <Link to='/' className={style.logo_login}><i class="fa-solid fa-dumbbell">_GYMApp</i></Link>
                </div>
                <div className={style.welcome}>
                    <p>Welcome to your best workout</p>
                </div>
                <div className={style.form_container}>
                    <div className={style.form_floating}>
                        <input type="email" className={style.form_control} id="email" placeholder="example@gmail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        <label>Email address</label>
                    </div>
                    <div className={style.form_floating}>
                        <input type="password" className={style.form_control} id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <button className={style.btn} onClick={() => handleClick()}>Submit</button>

                    <div className={style.m_3}>
                        <Link className={style.text_danger} to="/signup">Not registered?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}