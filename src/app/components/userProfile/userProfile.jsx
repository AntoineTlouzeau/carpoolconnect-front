import React, { useState, useEffect } from "react";
import SidebarProfile from "../layouts/SidebarProfile";
import ListItineraryComponent from "../itinerary/ListItineraryComponent";
import ModifyPassword from "../modifyPassword/ModifyPassword";
import DeleteAccountForm from "../deleteAccountForm/DeleteAccountForm2";
import Todo from "../utils/Todo";

const UserProfile = () => {
    const pages = {
        Route: "route",
        Password: "password",
        BuyPoints: "buyPoints",
        SellPoints: "sellPoints",
        DeactivateAccount: "deactivateAccount",
        DeleteAccount: "deleteAccount",
    };

    const [page, setPage] = useState(pages.Route);

    const handleState = (page) => {
        setPage(page);
    };

    useEffect(() => {}, [page]);

    const switchPage = () => {
        switch (page) {
            case pages.Route:
                return <ListItineraryComponent />;
            case pages.Password:
                return <ModifyPassword />;
            case pages.BuyPoints:
                return <Todo />;
            case pages.SellPoints:
                return <Todo />;
            case pages.DeactivateAccount:
                return <Todo />;
            case pages.DeleteAccount:
                return <DeleteAccountForm />;
        }
    };

    return (
        <div className="flex lg:w-3/4 w-11/12 justify-around">
            <SidebarProfile page={page} change={handleState} />
            <div className="max-w-2xl w-full h-fit space-y-9 rounded-md bg-white my-8 shadow mx-8">
                {switchPage()}
            </div>
        </div>
    );
};

export default UserProfile;
