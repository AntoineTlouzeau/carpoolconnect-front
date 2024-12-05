import React from "react";

const Button = ({ onClick, children, type }) => {

    return (
        <button type={type} className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;