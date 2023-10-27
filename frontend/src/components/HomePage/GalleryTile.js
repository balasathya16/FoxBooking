import React, { useEffect, useState } from 'react';
import ListingTile from './ListingTile';
import axios from 'axios';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ searchResults }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('GalleryTile component mounted');
    
    const fetchListings = async () => {
      try {
        if (searchResults && searchResults.length > 0) {
          console.log('Using searchResults for listings:', searchResults);
          setListings(searchResults);
          setLoading(false);
        } else {
          console.log('Fetching listings from API');
          const response = await axios.get('http://127.0.0.1:8000/cricket');
          const { data } = response;
          if (Array.isArray(data) && data.length > 0) {
            setListings(data);
          } else {
            console.error('Invalid or empty API response:', data);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    if (!searchResults || searchResults.length === 0) {
      fetchListings();
    }
  }, [searchResults]);

  console.log('Listings in GalleryTile:', listings);
};

    // Fetch listings only if searchResults are not provided
    if (!searchResults || searchResults.length === 0) {
      fetchListings();
    }
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
