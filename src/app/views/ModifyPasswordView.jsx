import React, { useEffect } from "react";
import ModifyPassword from "../components/modifyPassword/ModifyPassword";

/**
 * View/Page modification du mot de passe
 *
 * @author Anne Chebel
 */
const ModifyPasswordView = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <ModifyPassword />
        </div>
    );
};

export default ModifyPasswordView;
