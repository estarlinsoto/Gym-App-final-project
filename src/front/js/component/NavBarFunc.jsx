import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar_User.module.css"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"

export const NavBarFunc = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/trainer" className="navbar-brand">
                        <i className="fas fa-dumbbell"></i> _GYMApp
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/user/routines" className="nav-link">Routines</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/diets" className="nav-link">Diets</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/progress" className="nav-link">Progress</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={() => { actions.logout(); navigate('/home'); }}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

