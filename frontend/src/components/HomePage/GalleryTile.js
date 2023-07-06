import React from 'react';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ name }) => {
  const lowercaseName = name.toLowerCase();
  return (
    <div className="gallery-tile">
      <img src={process.env.PUBLIC_URL + `/images/${lowercaseName}.jpg`} alt={name} />
    </div>
  );
};

export default GalleryTile;
