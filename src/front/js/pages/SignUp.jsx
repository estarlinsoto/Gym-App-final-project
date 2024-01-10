import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../styles/SignUp.module.css'


export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.newUserRes == "success") {
            navigate('/login')
        }
        setMsg(store.newUserRes)

    }, [store.newUserRes])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [msg, setMsg] = useState("")

    const sendForm = () => {
        let emailInput = email
        emailInput = emailInput.toLocaleLowerCase()

        if (password.length < 6 || !emailInput.includes("@gmail.com") || emailInput.length < 11 || lastName.length < 3 || firstName.length < 3) {
            setMsg("The password or email does not meet the registration requirements.")

        } else {

            let newUser = {
                email: emailInput,
                password: password,
                first_name: firstName,
                last_name: lastName,
                pathologies: "pathologiesgdfg",
                date_of_birth: "1151515",
                role: "admin"

            }

            actions.createNewUser(newUser)
            setEmail('')
            setPassword('')


        }
    }


    return (

        <div className={style.custom_container}>

            <div className={`${style.custom_form_container} m-5`}>

                <Link to={'/'} className={style.link}>
                    <h4><i class="fa-solid fa-dumbbell"></i>_GYMApp</h4>
                </Link>
                <h1>Sign Up Now</h1>

                {msg.length === 0 ? "" : <div className="alert alert-danger" role="alert">{msg}</div>}

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="firstName">First Name</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="lastName">Last Name</label>
                    <input type="text" className={`${style.custom_input} text-center`} id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="email">Email address</label>
                    <input type="email" className={`${style.custom_input} text-center`} id="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className={style.custom_form_item}>
                    <label className={style.custom_label} htmlFor="password">Password</label>
                    <input type="password" className={`${style.custom_input} text-center`} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="button" className={style.custom_btn} onClick={() => sendForm()}>Click here to sign up now!</button>

                <div className={style.warning_message}>
                    <h5>Requirements for registration:</h5>
                    <p><b>Password must be a minimum length of 6</b></p>
                    <h3><b>Only "GMAIL" Accounts Accepted For Registration</b></h3>
                </div>
            </div>
        </div>
    );
};