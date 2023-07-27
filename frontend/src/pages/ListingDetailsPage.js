import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ListingDetailsPage.css'; // You can create a new CSS file for this page if needed

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cricket/${id}`);
        const { data } = response;
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No listing found.</div>;
  }

  return (
    <div className="listing-details-page">
      {/* Display listing images */}
      <div className="listing-images">
        {listing.images.map((image, index) => (
          <img key={index} src={image} alt={listing.name} />
        ))}
      </div>
      {/* Display listing name and description */}
      <h2>{listing.name}</h2>
      <p>{listing.description}</p>
      {/* Add other listing details here */}
      {/* Add a "Book Now" button */}
      <button>Book Now</button>
    </div>
  );
};

export default ListingDetailsPage;
