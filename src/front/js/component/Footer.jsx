import React, { Component } from "react";
import style from '../../src/front/styles/Footer.module.css'

export const Footer = () => (

    <footer className="">
        <div className={style.social__media}>
            <div className={style.social__media__wrap}>
                <div className={style.footer__logo}>
                    <a href="/" id={style.footer__logo}><i className="fa-solid fa-dumbbell"></i>__GYMApp</a>
                </div>
                <p className={style.website__rights}><i class="fa-solid fa-copyright"></i>GYMApp 2023. All rights reserved</p>
                <div className={style.social__icons}>
                    <a href="/" className={style.social__icon__link} target="_blank">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="/" className={style.social__icon__link} target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="/" className={style.social__icon__link} target="_blank">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="/" className={style.social__icon__link} target="_blank">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
);