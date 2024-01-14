import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../styles/SignUp.module.css'


export const AdminSignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.newUserRes == "success") {
            setMsg("register success!")
            setTimeout(() => { setMsg("") }, 10000)
            setColor('alert alert-success')
        }

        if (store.newUserRes == "Email already exists") {
            setMsg("Email already exists.")
            setTimeout(() => { setMsg("") }, 10000)
            setColor('alert alert-danger')
        }


    }, [store.newUserRes])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [client, setClient] = useState("")
    const [secret, setSecret] = useState("")
    const [msg, setMsg] = useState("")
    const [color, setColor] = useState("")

    const sendForm = () => {
        let emailInput = email
        emailInput = emailInput.toLocaleLowerCase()

        if (password.length < 6 || !emailInput.includes("@gmail.com") || emailInput.length < 11 || lastName.length < 3 || firstName.length < 3) {
            setColor('alert alert-danger')
            setMsg("The password or email does not meet the registration requirements.")
            setTimeout(() => { setMsg("") }, 10000)


        } else {

            let user = {
                email: emailInput,
                password: password,
                client_paypal: client,
                secret_paypal: secret,
                role: "admin"

            }

            actions.createNewAdmin(user)
            setEmail('')
            setPassword('')
            setClient('')
            setSecret('')


        }
    }


    return (

        <div className={style.custom_container}>

            <div className={`${style.custom_form_container} m-5`}>

                <Link to={'/'} className={style.link}>
                    <h4><i class="fa-solid fa-dumbbell"></i>_GYMApp</h4>
                </Link>
                <h1>Sign Up</h1>

                {msg.length == 0 ? "" : <div className={`${color} w-100`} role="alert">{msg}</div>}
                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="email">Email address</label>
                    <input type="email" className={`${style.custom_input} text-center`} id="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="password">Password</label>
                    <input type="password" className={`${style.custom_input} text-center`} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="firstName">Client</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="firstName" placeholder="client" value={client} onChange={(e) => setClient(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="lastName">Secret</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="lastName" placeholder="secret" value={secret} onChange={(e) => setSecret(e.target.value)} />
                </div>

                <button type="button" className={style.custom_btn} onClick={() => sendForm()}>Submit</button>

                <div className={style.warning_message}>
                    <h5>Requirements for registration:</h5>
                    <p><b>Password must be a minimum length of 6</b></p>
                    <h3><b>Only "GMAIL" Accounts Accepted For Registration</b></h3>
                </div>
            </div>
        </div>
    );
};