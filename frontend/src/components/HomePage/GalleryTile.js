import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingTile from './ListingTile';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ searchResults }) => {
  console.log('GalleryTile received searchResults:', searchResults);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect in GalleryTile triggered');
    console.log('Search Results:', searchResults);
    
    const fetchListings = async () => {
      try {
        if (searchResults && searchResults.length > 0) {
          // If search results are available, use them
          console.log('Using search results:', searchResults);
          setListings(searchResults);
        } else {
          const response = await axios.get('http://127.0.0.1:8000/cricket');
          const { data } = response;

          if (Array.isArray(data) && data.length > 0) {
            console.log('Using API results:', data);
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
  }, [searchResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listings || listings.length === 0) {
    return <div>No listings available.</div>;
  }

  return (
    <div className="gallery-tile">
      <div className="listing-container">
      {console.log('Listings:', listings)}
        {listings.map((listing) => (
          <ListingTile key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default GalleryTile;
