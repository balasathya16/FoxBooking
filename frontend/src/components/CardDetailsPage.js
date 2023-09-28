import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCheckoutForm from '../pages/PaymentForm.js';

const stripePromise = loadStripe('pk_test_51NfSEEG73qJpjALVaHz7O59835GKo33MWLrLrmfbtYJVKVeQf6ZE0UZzQCepDteHikbE4rGdxiM8LmvVocJmIAdG00L1DjQ8ex');

const CardDetailsPage = () => {
  const location = useLocation();
  const totalCost = location.state.totalCost; // Use the actual totalCost from location state

  console.log('Total cost in CardDetailsPage:', totalCost);

  return (
    <div>
      <h1>Enter Card Details</h1>
      <Elements stripe={stripePromise}>
        <MyCheckoutForm totalCost={totalCost} /> {/* Pass the actual totalCost */}
      </Elements>
    </div>
  );
};

export default CardDetailsPage;
