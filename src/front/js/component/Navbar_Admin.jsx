import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js"
import style from "../../styles/Navbar_Admin.module.css"
import { useNavigate } from "react-router-dom";

export const Navbar_Admin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    return (

        <div className="">
            <nav className={`style.navbar`}>
                <div className={style.navbar__container}>
                    <Link to="/admin" className={style.link}>
                        <a id={style.navbar__logo}><i className="fa-solid fa-dumbbell"></i>_GYMApp</a>
                    </Link>
                    <div className={style.navbar__toggle} id={style.mobile_menu}>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                    </div>
                    <ul className={style.navbar__menu}>
                        <li className={style.nabvar__item}>
                            <Link to="/admin/users" className={style.link}>
                                <a className={style.navbar__links}>Users</a>
                            </Link>
                        </li>
                        <li className={style.navbar__item}>
                            <Link to="/admin/trainer" className={style.link}>
                                <a className={style.navbar__links}>Trainers</a>
                            </Link>
                        </li>
                        <li className={style.item}>
                            <Link to="/admin/finances" className={style.link}>
                                <a className={style.navbar__links}>Finances</a>
                            </Link>
                        </li>
                        <Link to="/home" className={style.link}>
                            <li className={style.nabvar__btn}>
                                <button className={style.button} onClick={() => actions.logout()} >Logout</button>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar_Admin