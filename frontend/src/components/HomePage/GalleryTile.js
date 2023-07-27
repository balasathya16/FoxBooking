import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingTile from './ListingTile';
import '../../styles/GalleryTile.css';
import { useNavigate } from 'react-router-dom';

const GalleryTile = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

   // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/cricket');
        const { data } = response;

        if (Array.isArray(data) && data.length > 0) {
          setListings(data);
        } else {
          console.error('Invalid or empty API response:', data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listings || listings.length === 0) {
    return <div>No listings available.</div>;
  }

  return (
    <div className="gallery-tile">
      <h2>Gallery</h2>
      <div className="listing-container">
        {listings.map((listing) => (
          <a key={listing.id} href={`/listing/${listing.id}`} target="_blank" rel="noopener noreferrer">
            <ListingTile listing={listing} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GalleryTile;
