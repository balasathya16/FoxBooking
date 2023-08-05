import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
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
        <DateTimePicker
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()} // Optionally set a minimum date
          // You can add more props to customize the appearance and behavior of the date picker
        />
        <p>Selected Date: {selectedDate.toString()}</p>
      </div>

      <div>
        <h2>Select Start Time</h2>
        <DateTimePicker
          onChange={handleStartTimeChange}
          value={startTime}
          disableClock={true} // Disable the clock for time picking
          // You can add more props to customize the appearance and behavior of the time picker
        />
        <p>Selected Start Time: {startTime.toString()}</p>
      </div>

      <div>
        <h2>Select End Time</h2>
        <DateTimePicker
          onChange={handleEndTimeChange}
          value={endTime}
          disableClock={true} // Disable the clock for time picking
          // You can add more props to customize the appearance and behavior of the time picker
        />
        <p>Selected End Time: {endTime.toString()}</p>
      </div>

      <div>
        <h2>Time Duration</h2>
        <p>{timeDuration.toFixed(2)} hours</p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
