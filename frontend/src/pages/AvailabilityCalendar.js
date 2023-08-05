// src/pages/AvailabilityCalendar.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AvailabilityCalendar.css'

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add your logic here to handle the selected date and time
  };

  // Log any errors that might occur in the component
  if (selectedDate instanceof Date === false) {
    console.error('Error: selectedDate is not a valid Date object.');
  }

  return (
    <div>
      {/* Render the availability calendar component here */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()} // Optionally set a minimum date
        // You can add more props to customize the appearance and behavior of the picker
      />
      {/* You can display the selected date and time to the user */}
      <p>Selected Date: {selectedDate.toString()}</p>
    </div>
  );
};

export default AvailabilityCalendar;
