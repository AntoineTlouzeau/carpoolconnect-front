import { useEffect, useState } from "react";
import SidebarRoutes from "../layouts/SideBarRoutes";
import Todo from "../utils/Todo";
import ReservationsWaiting from "../reservations/ReservationsWaiting";
import InscriptionTrajet from "../trajet/InscriptionTrajet";
import SearchRoute from "../searchRoute/SearchRoute";
import UserReservations from "../reservations/UserReservations";
import ListItineraryComponent from "./ListItineraryComponent";

const GestionRoutes = () => {
    const pages = {
        Route: "route",
        Proposal: "proposal",
        Research: "research",
        Reservations: "reservations",
        Accept: "accept",
        Comments: "comments",
        Chat: "chat",
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
            case pages.Proposal:
                return <InscriptionTrajet />;
            case pages.Research:
                return <SearchRoute />;
            case pages.Reservations:
                return <UserReservations />;
            case pages.Accept:
                return <ReservationsWaiting />;
            case pages.Comments:
                return <Todo />;
            case pages.Chat:
                return <Todo />;
        }
    };
    return (
        <div className="flex lg:w-3/4 w-11/12 justify-around">
            <SidebarRoutes page={page} change={handleState} />
            <div className="max-w-2xl lg:w-3/4 w-11/12 h-fit space-y-9 rounded-md bg-white my-8 shadow mx-8">
                {switchPage()}
            </div>
        </div>
    );
};

export default GestionRoutes;
