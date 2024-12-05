import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_HOME } from '../constants/urls/urlFrontEnd';
import Login from './../components/account/Login';
import { selectIsLogged } from './../redux-store/authenticationSlice';
import Inscription from '../components/inscription/Inscription';

/**
 * View/Page Login
 *
 * @author Peter Mollet
 */
const LoginView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_HOME);
    }, []);

    return (
        <div className="bg-background bg-bottom bg-contain bg-no-repeat flex h-full items-center justify-center">
            <Login className="" />
        </div>
    );
};

export default LoginView;
