import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingTile from './ListingTile';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ searchResults }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (searchResults && searchResults.length > 0) {
          // If searchResults are provided, use them
          setListings(searchResults); // Set the listings directly from searchResults
        } else {
          const response = await axios.get('http://127.0.0.1:8000/cricket');
          const { data } = response;

          if (Array.isArray(data) && data.length > 0) {
            setListings(data);
          } else {
            console.error('Invalid or empty API response:', data);
          }
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchResults]); // Re-run this effect whenever searchResults changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listings || listings.length === 0) {
    return <div>No listings available.</div>;
  }

  return (
    <div className="gallery-tile">
      <div className="listing-container">
        {listings.map((listing) => (
          <ListingTile key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default GalleryTile;
