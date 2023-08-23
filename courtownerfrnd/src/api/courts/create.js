// src/api/courts/create.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).end(); // Method Not Allowed
      return;
    }
  
    try {
      const { location, name, description, netsAvailable, pricePerHour } = req.body;
  
      // Check if required fields are provided
      if (!location || !name || !description || netsAvailable === undefined || pricePerHour === undefined) {
        res.status(400).json({ message: 'Missing or invalid data in request body' });
        return;
      }
  
      // Your image upload logic can go here if needed
  
      // Prepare the court data to be sent to the backend
      const courtData = {
        location,
        name,
        description,
        netsAvailable: parseInt(netsAvailable),
        pricePerHour: parseFloat(pricePerHour),
        // Add other fields as needed
      };
  
      // Make the POST request to your backend API
      const response = await fetch('/api/courts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courtData),
      });
  
      if (response.status === 201) {
        const { id } = await response.json();
        res.status(201).json({ id });
      } else {
        res.status(response.status).json({ message: 'Failed to create court' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  