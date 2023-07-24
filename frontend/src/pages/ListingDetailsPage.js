// ListingDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ListingDetailsPage.css'; // You can create a new CSS file for this page if needed

const ListingDetailsPage = () => {
  // Access the listing ID from the URL params
  const { id } = useParams();

  // Fetch listing details from the API or use props to access the listing data
  // Replace the placeholder data with actual data fetched from the API
  const listing = {
    id: id,
    name: 'Listing Name',
    description: 'Listing description goes here...',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    // Add other details about the listing, e.g., location, price, availability, etc.
  };

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
