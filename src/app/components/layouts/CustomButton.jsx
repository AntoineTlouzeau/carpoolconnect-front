import React from "react";

const CustomButton = ({ onClick, children, color, disabled }) => {
    const buttonStyles = {
        width: "100%",
        backgroundColor: color || "#4CAF50",
        color: "white",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "20px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "0.6" : "1",
    };

    return (
        <button
            type="submit"
            onClick={onClick}
            style={buttonStyles}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;
