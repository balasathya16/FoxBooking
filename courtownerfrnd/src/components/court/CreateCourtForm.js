import React, { useState, useEffect } from 'react';
import styles from '../../../styles/CreateCourtForm.module.css';
import CourtCreationModal from '../CourtCreationModal';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import loadGoogleMapsScript from '../../utils/loadGoogleMapsScript';


const CreateCourtForm = () => {
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [netsAvailable, setNetsAvailable] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

    // Load the Google Maps API script when the component mounts
    useEffect(() => {
      const loadScript = async () => {
        try {
          console.log('Loading Google Maps API script...');
          const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
          console.log('API Key:', apiKey);
    
          await new Promise((resolve, reject) => {
            loadGoogleMapsScript(apiKey, resolve);
          });
    
          console.log('Google Maps API script loaded successfully.');
        } catch (error) {
          console.error('Error loading Google Maps JavaScript API:', error);
        }
      };
    
      loadScript();
    }, []);
    

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
  };


  const resetFormFields = () => {
    setLocation('');
    setName('');
    setDescription('');
    setNetsAvailable('');
    setPricePerHour('');
    setSelectedImages([]);
  };


  const handleLocationChange = (address) => {
    setLocation(address);
  };
  
  const handleSelect = async (address) => {
    setLocation(address);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log('LatLng:', latLng); // You can save latLng or use it as needed
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };




 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', location);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('netsAvailable', netsAvailable);
    formData.append('pricePerHour', pricePerHour);

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }

    try {
      const response = await fetch('http://localhost:8000/cricket', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        const { id } = await response.json();
        console.log(`Court created with ID: ${id}`);
        setLocation('');
        setName('');
        setDescription('');
        setNetsAvailable('');
        setPricePerHour('');
        setSelectedImages([]);
        setCreationSuccess(true); // Set success state to true on successful creation
      } else {
        const errorMessage = await response.json();
        console.error('Failed to create court:', errorMessage.message);
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };

  
  
   return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Create Court</h2>
      {creationSuccess && (
        <CourtCreationModal closeModal={() => {
          setCreationSuccess(false);
          resetFormFields(); // Reset form fields when modal is closed
        }} />
      )}
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>Name:</label>
        <input
          className={styles.formInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className={styles.formLabel}>Location:</label>
        <PlacesAutocomplete
  value={location}
  onChange={handleLocationChange}
  onSelect={handleSelect}
>
  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
    console.log('Suggestions:', suggestions); // Log the suggestions
    return (
      <div>
        <input
          {...getInputProps({
            placeholder: 'Search for a location...',
            className: styles.formInput,
          })}
          required
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map((suggestion) => {
            const className = suggestion.active
              ? styles.suggestionItemActive
              : styles.suggestionItem;
            return (
              <div
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion, {
                  className,
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }}
</PlacesAutocomplete>

        <label className={styles.formLabel}>Description:</label>
        <textarea
          className={styles.formTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className={styles.formLabel}>Nets Available:</label>
        <input
          className={styles.formInput}
          type="number"
          value={netsAvailable}
          onChange={(e) => setNetsAvailable(e.target.value)}
          required
        />

        <label className={styles.formLabel}>Price Per Hour:</label>
        <input
          className={styles.formInput}
          type="number"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          required
        />

        <div className={styles.imagesSection}>
          <label className={styles.formLabel}>Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {selectedImages.length > 0 && (
            <span className={styles.fileInputLabel}>
              {`${selectedImages.length} file(s) chosen`}
            </span>
          )}
        </div>

        <button className={styles.formButton} type="submit">Create Court</button>
      </form>
    </div>
  );
};

export default CreateCourtForm;
