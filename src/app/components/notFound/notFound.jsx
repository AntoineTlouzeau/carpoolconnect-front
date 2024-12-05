import React from 'react';
import styled from 'styled-components';
import imageCrash from './../../..src/imageCrash.png';

const imageCrashContainer = styled.div`
  width: 100%;
  max-width: 1440px; /* Set a maximum width as needed */
  margin: 0 auto;
`;

const imageCrash = styled.img`
  width: 1440p;
  height: 844p;
`;
const LeftColumn = styled.div`
  width: 616px;
  height: 201px;
  color: #1565C0;
  text-align : left;
`;

const RightColumn = styled.div`
  width: 616px;
  height: 81px;
  text-align : left;
`;

const notFound = () => {
  return (
    <div>
      <imageCrashContainer>
        <imageCrash src={imageCrash} alt="imageCrash" />
      </imageCrashContainer>
      <LeftColumn><h1>404 - Aucun covoiturage ici, faites demi-tour!</h1></LeftColumn>
      <RightColumn><p>Parfois, même les chemins les mieux tracés peuvent conduire à des découvertes inattendues. Revenez sur la route en cliquant sur le lien ci dessous</p></RightColumn>
    </div>
  );
};

export default notFound;