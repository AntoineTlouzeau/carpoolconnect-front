import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/layouts/Navbar";
import { selectIsLogged, signIn } from "./redux-store/authenticationSlice";
import Routes from "./routes/Routes";
import { getToken } from "./services/tokenServices";
import Footer from "./components/layouts/Footer";

import "leaflet/dist/leaflet.css";
import "./App.css";
import PoPup from "./components/deleteAccountForm/poPup";

const contextClass = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const App = () => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) dispatch(signIn(token));
        setIsLogin(false);
    }, []);

    if (isLogin) return null;

    return (
        <BrowserRouter>
            <div className="relative flex cursor-default flex-col bg-gray-100 h-max min-h-screen">
                <Navbar />

                <main className="mt-52 h-full relative sm:mt-12 grow">
                    <Routes />
                </main>
                <ToastContainer
                    toastClassName={({ type }) =>
                        contextClass[type || "default"] +
                        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                    }
                    bodyClassName={() =>
                        "text-sm font-white font-med block p-3"
                    }
                    position="bottom-left"
                    autoClose={3000}
                />
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default App;
