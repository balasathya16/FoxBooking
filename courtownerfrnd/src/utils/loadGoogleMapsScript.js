const loadGoogleMapsScript = (apiKey, callback) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
  
    script.onload = callback;
  
    script.onerror = (error) => {
      console.error('Error loading Google Maps JavaScript API:', error);
    };
  
    document.head.appendChild(script);
  };
  
  export default loadGoogleMapsScript;
  