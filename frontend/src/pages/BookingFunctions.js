// bookingFunctions.js

const handleConfirmBooking = async (bookingUUID, cricketCourtUUID, amount) => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingUUID,
          cricketCourtUUID,
          amount,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Call a function to handle successful booking confirmation, e.g., display a success message
        console.log('Booking confirmed:', data);
      } else {
        // Handle error cases here, e.g., show an error message
        console.error('Failed to confirm booking');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  export default handleConfirmBooking;
  