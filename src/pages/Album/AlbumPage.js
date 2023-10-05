import React from 'react';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
    const { cardId } = useParams();
  
    return (
      <div>
        <h1>Album Page</h1>
        <p>Card ID: {cardId}</p>
      </div>
    );
  };

export default AlbumPage;