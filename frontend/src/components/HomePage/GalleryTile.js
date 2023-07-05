import React from 'react';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ name }) => {
  return (
    <div className="gallery-tile">
      <img src={`images/${name.toLowerCase()}.jpg`} alt={name} />
    </div>
  );
};

export default GalleryTile;
