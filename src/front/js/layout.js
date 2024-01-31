import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home  from "../../views/Home.jsx";
import { AdminView }  from "../../views/AdminView.jsx";
import { AdminUser }  from "../../views/AdminUser.jsx";
import { AdminTrainer }  from "../../views/AdminTrainer.jsx";
import User  from "../../views/User.jsx";
import { CaloriesCalculator }  from "../../views/CaloriesCalculator.jsx";
import { TrainerHome }  from "../../views/TrainerHome.jsx";
import { TrainerAssignRoutine }  from "../../views/TrainerAssignRoutine.jsx";
import { TrainerAssignDiet }  from "../../views/TrainerAssignDiet.jsx";
import injectContext from "./store/appContext";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { AdminLogin } from "./pages/AdminLogin.jsx";
import { TrainerLogin } from "./pages/TrainerLogin.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { UserRoutines } from "./pages/UserRoutines.jsx";
import { UserDiet } from "./pages/UserDiet.jsx";
import { AdminSignUp } from "./pages/AdminSignUp.jsx";
import { ConfirmPayment } from "../../views/ConfirmPayment.jsx";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<User />} path="/user" />                        
                        <Route element={<Login />} path="/login" />  
                        <Route element={<AdminLogin />} path="/login/a" />      
                        <Route element={<TrainerLogin />} path="/login/trainer" />                   
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<AdminSignUp />} path="/signup/a" />
                        <Route element={<AdminView />} path="/admin" />
                        <Route element={<AdminUser />} path="/admin/users" />
                        <Route element={<AdminTrainer />} path="/admin/Trainer" />
                        <Route element={<UserRoutines />} path="/user/routine" />
                        <Route element={<UserDiet />} path="/user/diet" />
                        <Route element={<TrainerHome />} path="/trainer" />   
                        <Route element={<TrainerAssignRoutine />} path="/trainer/assignroutine" />   
                        <Route element={<TrainerAssignDiet />} path="/trainer/assigndiet" />   
                        <Route element={<CaloriesCalculator />} path="/user/calculate" />    
                        <Route element={<ConfirmPayment />} path="/user/confirm/payment" />    
                        <Route element={<h1>Not found!</h1>} path="/*"  />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
