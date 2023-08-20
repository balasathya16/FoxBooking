import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NfSEEG73qJpjALVaHz7O59835GKo33MWLrLrmfbtYJVKVeQf6ZE0UZzQCepDteHikbE4rGdxiM8LmvVocJmIAdG00L1DjQ8ex');

const handleConfirmBooking = async (bookingUUID, cricketCourtUUID, amount, cardElement) => {
    try {
        // Step 1: Create a payment intent on the server
        const paymentResponse = await fetch('http://127.0.0.1:8000/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cricketCourtUUID,
                amount,
            }),
        });

        if (!paymentResponse.ok) {
            console.error('Failed to create payment intent');
            return;
        }

        const paymentData = await paymentResponse.json();

        // Step 2: Collect payment details and complete the payment using a payment gateway
        const stripe = await stripePromise; // Await the stripePromise

        const { clientSecret } = paymentData;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: cardElement,
        });
        

        if (error) {
            console.error('Payment failed:', error);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Step 3: If payment is successful, send booking confirmation to the server
            const bookingResponse = await fetch('/api/confirm-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingUUID,
                }),
            });

            if (bookingResponse.ok) {
                console.log('Booking confirmed');
                // Call a function to handle successful booking confirmation, e.g., display a success message
            } else {
                console.error('Failed to confirm booking');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

export default handleConfirmBooking;
