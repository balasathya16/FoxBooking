import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCheckoutForm from '../pages/PaymentForm'; // Updated import

const stripePromise = loadStripe('pk_test_51NfSEEG73qJpjALVaHz7O59835GKo33MWLrLrmfbtYJVKVeQf6ZE0UZzQCepDteHikbE4rGdxiM8LmvVocJmIAdG00L1DjQ8ex');

const CardDetailsPage = () => {
  return (
    <div>
      <h1>Enter Card Details</h1>
      <Elements stripe={stripePromise}>
        <MyCheckoutForm />
      </Elements>
    </div>
  );
};

export default CardDetailsPage;
