import React from 'react';
import CustomButton from './CustomButton';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <CustomButton label="Proposer un trajet" />
      <CustomButton label="Rechercher un trajet" />
      <CustomButton label="Demander une réservation" />
      <CustomButton label="Accepter une réservation" />
      <CustomButton label="Avis et commentaires" />
      <CustomButton label="Messagerie" />
    </div>
  );
};

export default Sidebar;