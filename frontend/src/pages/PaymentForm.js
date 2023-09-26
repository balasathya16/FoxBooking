import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/PaymentForm.css'; // Make sure to adjust the path based on your file structure

const MyCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent on your server
      const response = await fetch('http://localhost:8000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error('Error confirming payment:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        // You can handle success, e.g., show a success message or redirect to a success page
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="label">
        Card details
        <CardElement className="card-element" />
      </label>
      <button type="submit" className="pay-button" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default MyCheckoutForm;
