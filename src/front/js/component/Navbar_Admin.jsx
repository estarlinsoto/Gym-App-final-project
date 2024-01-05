import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar_Admin.module.css"
import { useNavigate } from "react-router-dom";

export const Navbar_Admin = () => {

    const navigate = useNavigate();
    return (

        <div>
            <nav className={style.navbar}>
                <div className={style.navbar__container}>
                    <Link to="/user" className={style.link}>
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
                            <Link to="/admin/trainers" className={style.link}>
                                <a className={style.navbar__links}>Trainers</a>
                            </Link>
                        </li>
                        <li className={style.item}>
                            <Link to="/admin/administration" className={style.link}>
                                <a className={style.navbar__links}>Administration</a>
                            </Link>
                        </li>
                        <Link to="/home" className={style.link}>
                            <li className={style.nabvar__btn}>
                                <button className={style.button} onClick={() => navigate('/home')} >Logout</button>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar_Admin