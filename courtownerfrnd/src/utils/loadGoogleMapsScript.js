const loadGoogleMapsScript = (apiKey) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };
  
  export default loadGoogleMapsScript;
  