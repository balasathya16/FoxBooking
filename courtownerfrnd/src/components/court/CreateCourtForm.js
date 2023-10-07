import React, { useState } from 'react';
import styles from '../../../styles/CreateCourtForm.module.css';
import CourtCreationModal from '../CourtCreationModal';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import loadGoogleMapsScript from '../../utils/loadGoogleMapsScript';


const CreateCourtForm = () => {
  const [creationSuccess, setCreationSuccess] = useState(false); // State to track success
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [netsAvailable, setNetsAvailable] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

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


  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

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
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
          )}
        </PlacesAutocomplete>
        <input
          className={styles.formInput}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

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
