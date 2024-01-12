import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"
//import {Checkout} from './';
import PayPalButton from "./paypalbtn.jsx";

export const Paypal = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        if(store.redirectToPaypal.length > 0){
            
           //navigate(window.location.href = store.redirectToPaypal)
        }

    }, [store.redirectToPaypal.length])

    return (

        <div className="container-fluid">
            <button type="button" className="btn btn-warning" onClick={()=> actions.createProductPaypal()}>PAYPAL</button>
          
        </div>
    );
};

PayPalButton