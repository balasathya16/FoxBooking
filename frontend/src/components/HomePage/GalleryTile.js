import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingTile from './ListingTile';
import '../../styles/GalleryTile.css';
import { Link } from 'react-router-dom'; // Add this import statement

const GalleryTile = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cricket court listings from the backend API
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
          // Use the Link component to navigate to the listing details page
          <Link key={listing.id} to={`/listing/${listing.id}`}>
            <ListingTile listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryTile;
