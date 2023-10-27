import React, { useEffect, useState } from 'react';
import ListingTile from './ListingTile';
import axios from 'axios';
import '../../styles/GalleryTile.css';

const GalleryTile = ({ searchResults }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (searchResults && searchResults.length > 0) {
          // Render search results
          setListings(searchResults);
          setLoading(false);
        } else {
          // Fetch data from the /search endpoint when there are no search results
          console.log('Fetching listings from /search endpoint');
          const response = await axios.get(`http://127.0.0.1:8000/cricket/search?query=`); // You might need to add a query parameter for the search query here
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

    fetchListings(); // Always fetch listings initially

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
        {listings.map((listing) => (
          <ListingTile key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};


export default GalleryTile;
