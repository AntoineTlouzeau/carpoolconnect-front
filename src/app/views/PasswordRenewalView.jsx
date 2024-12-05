import React, { useEffect } from "react";

import PasswordRenewal from "../components/account/PasswordRenewal";

/**
 * View/Page récupération de mot de passe
 *
 * @author Emile Mistrot
 */
const PasswordRenewalView = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <PasswordRenewal className="" />
        </div>
    );
};

export default PasswordRenewalView;
