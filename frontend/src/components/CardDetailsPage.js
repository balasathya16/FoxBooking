import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCheckoutForm from '../pages/PaymentForm.js';

const stripePromise = loadStripe('pk_test_51NfSEEG73qJpjALVaHz7O59835GKo33MWLrLrmfbtYJVKVeQf6ZE0UZzQCepDteHikbE4rGdxiM8LmvVocJmIAdG00L1DjQ8ex');

const CardDetailsPage = () => {
  const totalCost = 100; // Set a sample totalCost for testing

  console.log('Total cost in CardDetailsPage:', totalCost);

  return (
    <div>
      <h1>Enter Card Details</h1>
      <Elements stripe={stripePromise}>
        <MyCheckoutForm totalCost={totalCost} /> {/* Pass stripe prop to MyCheckoutForm through Elements */}
      </Elements>
    </div>
  );
};

export default CardDetailsPage;
