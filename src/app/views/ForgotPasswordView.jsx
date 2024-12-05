import React from 'react';
import { useNavigate } from 'react-router-dom';
//import ForgotPassword from './../components/account/ForgotPassword';
import ForgotPassword from './../components/forgotPassword/ForgotPassword';


const ForgotPasswordView = () => {
    const navigate = useNavigate();


    return (
        <div className="flex h-full items-center justify-center">
            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordView;
