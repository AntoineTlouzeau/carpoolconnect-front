import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteAccountForm from '../components/deleteAccountForm/DeleteAccountForm';


const DeleteAccountFormView = () => {
    const navigate = useNavigate();


    return (
        <div className="flex h-full items-center justify-center">
            <DeleteAccountForm />

        </div>
    );
};

export default DeleteAccountFormView;
