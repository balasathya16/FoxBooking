import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const AvailabilityCalendar = ({ pricePerHour }) => { // Receive pricePerHour as prop
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleReserveClick = () => {
    const startTimeObj = new Date(startTime);
    const endTimeObj = new Date(endTime);
  
    const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60); // Calculate timeDuration here
    const totalCost = pricePerHour * timeDuration;
  
    navigate('/booking-summary', {
      state: {
        selectedDate,
        startTime: startTimeObj,
        endTime: endTimeObj,
        pricePerHour,
        totalCost,
      },
    });
  };
  
  const timeDuration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return (
    <div>
      <div>
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
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
        />
        <p>Selected End Time: {endTime.toString()}</p>
      </div>

      <div>
        <h2>Time Duration</h2>
        <p>{timeDuration.toFixed(2)} hours</p>
      </div>
      <button className="cool-listing-book-button" onClick={handleReserveClick}>
        Reserve
      </button>
    </div>
  );
};

export default AvailabilityCalendar;
