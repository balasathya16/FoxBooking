import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  // Calculate the time duration in hours
  const timeDuration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return (
    <div>
      {/* Render the availability calendar and time picker components here */}
      <div>
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()} // Optionally set a minimum date
          // You can add more props to customize the appearance and behavior of the date picker
        />
        <p>Selected Date: {selectedDate.toString()}</p>
      </div>

      <div>
        <h2>Select Start Time</h2>
        <DatePicker
          selected={startTime}
          onChange={handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          // You can add more props to customize the appearance and behavior of the time picker
        />
        <p>Selected Start Time: {startTime.toString()}</p>
      </div>

      <div>
        <h2>Select End Time</h2>
        <DatePicker
          selected={endTime}
          onChange={handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          // You can add more props to customize the appearance and behavior of the time picker
        />
        <p>Selected End Time: {endTime.toString()}</p>
      </div>

      <div>
        <h2>Time Duration</h2>
        <p>{timeDuration.toFixed(2)} hours</p>
      </div>
      <button className="cool-listing-book-button">Reserve</button>
    </div>
  );
};

export default AvailabilityCalendar;
