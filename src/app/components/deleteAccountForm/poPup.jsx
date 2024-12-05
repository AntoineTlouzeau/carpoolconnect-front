import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";


/**
 *  POP_UP 
 * Prévenir l'utilisateur de la suppression de son compte
 * 
 */


const StyledModal = styled(Modal)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border: 1px solid #ccc; /* Bordure de 1 pixel couleur grise */
padding: 20px; /* Espace à l'intérieur de la bordure */
max-width: 600px; /* Ajustez la largeur maximale selon vos besoins */
max-height: 300px; /* Ajustez la hauteur maximale selon vos besoins */
text-align: center; /* Centrage du texte */
`;

const PoPup = ({ isOpen, onClose }) => {
    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose}>
            {/* Contenu de la modal */}
            <h4>Compte supprimé</h4>
            <p>Votre compte a été supprimé avec succès.</p>
            <Link
                to="/"
                onClick={onClose}
                className="text-sm text-emeraude underline"
            >Fermer
            </Link>
        </StyledModal>
    );
};

export default PoPup;
