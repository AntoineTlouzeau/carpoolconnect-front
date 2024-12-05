import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import carIcon from "../../assets/SVG/Car.svg";
import searchIcon from "../../assets/SVG/Search.svg";
import voucherIcon from "../../assets/SVG/Voucher.svg";
import checkIcon from "../../assets/SVG/Checkmark.svg";
import envelopeIcon from "../../assets/SVG/Envelope.svg";
import bubbleIcon from "../../assets/SVG/Bubble.svg";

const SidebarRoutes = ({ page, change }) => {
    const handleClick = (page) => {
        change(page);
    };

    return (
        <div className="flex flex-col">
            <UserCard />
            <button
                onClick={() => handleClick("route")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "route" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={carIcon} />
                    <p>Mes trajets</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("proposal")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "proposal" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={carIcon} />
                    <p>Proposer un trajet</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("research")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "research" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-7 my-auto mr-2" src={searchIcon} />
                    <p>Rechercher un trajet</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("reservations")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "reservations" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-7 my-auto mr-2" src={voucherIcon} />
                    <p>Mes réservations</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("accept")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "accept" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-7 my-auto mr-2" src={checkIcon} />
                    <p>Accepter une réservation</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("comments")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "comments" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={bubbleIcon} />
                    <p>Avis et commentaires</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("chat")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "chat" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={envelopeIcon} />
                    <p>Messagerie</p>
                </div>
            </button>
        </div>
    );
};

export default SidebarRoutes;
