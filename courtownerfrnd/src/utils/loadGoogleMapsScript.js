import dotenv from 'dotenv';
dotenv.config();

const loadGoogleMapsScript = (callback) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log('API Key:', apiKey);
  console.log('Env variables:', process.env);


  if (!apiKey) {
    console.error('API Key is not defined. Check your .env file.');
    return;
  }

  console.log('Loading Google Maps API script...');
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    console.log('Google Maps API script loaded successfully.');
    callback();  // Call the callback once the script is loaded
  };

  script.onerror = (error) => {
    console.error('Error loading Google Maps JavaScript API:', error);
  };

  // Log the script URL to ensure it's correct
  console.log('Script URL:', script.src);

  // Append the script to the head
  document.head.appendChild(script);
};

// Export the function
export default loadGoogleMapsScript;
