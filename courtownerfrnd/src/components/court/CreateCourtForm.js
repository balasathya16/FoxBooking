import React, { useState, useEffect } from 'react';
import styles from '../../../styles/CreateCourtForm.module.css';
import CourtCreationModal from '../CourtCreationModal';

const CreateCourtForm = () => {
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [netsAvailable, setNetsAvailable] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places`;
    script.async = true;
    script.onload = () => {
      console.log('Google Places API script loaded.');

      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('location'),
        { types: ['geocode'] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setLocation(place.formatted_address);
        }
      });
    };

    script.onerror = () => {
      console.error('Error loading Google Places API script.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);  // Replace YOUR_API_KEY with your actual API key

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

    console.log('Form Values:', { location, name, description, netsAvailable, pricePerHour });
    console.log('Location:', location);
    console.log('API Request FormData:', formData);

    try {
      const response = await fetch('http://localhost:8000/cricket', {
        method: 'POST',
        body: formData,
      });

      console.log('API Response Status:', response.status);

      if (response.status === 201) {
        const responseData = await response.json();
        console.log('Court created successfully:', responseData);
        setLocation('');
        setName('');
        setDescription('');
        setNetsAvailable('');
        setPricePerHour('');
        setSelectedImages([]);
        setCreationSuccess(true);
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
          resetFormFields();
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
      <input
        id="location"  // Ensure this ID matches the one in getElementById
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
