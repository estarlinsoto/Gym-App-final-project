import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import style from "../../styles/Navbar_Admin.module.css"

export const Navbar_Trainer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className={` container-fluid`}>
                    <Link to="/trainer" className="navbar-brand">
                        <a id={style.navbar__logo}><i id={style.navbar__logo} className="fa-solid fa-dumbbell"></i>_GYMApp</a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-center" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/trainer" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/trainer/assignroutine" className="nav-link">
                                    Assign Routines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/trainer/assigndiet" className="nav-link">
                                    Assign Diets
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light"
                                    onClick={() => { actions.logout(); navigate('/home'); }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
