import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const AvailabilityCalendar = ({ pricePerHour, listing }) => {
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

    const timeDuration = (endTimeObj.getTime() - startTimeObj.getTime()) / (1000 * 60 * 60);
    const totalCost = pricePerHour * timeDuration;

    navigate('/booking-summary', {
      state: {
        selectedDate,
        startTime: startTimeObj,
        endTime: endTimeObj,
        pricePerHour,
        totalCost,
        listing,
      },
    });
  };

  const timeDuration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return (
    <div className="availability-calendar-container">
      <div className="availability-calendar-picker">
        <h2 className="availability-calendar-header">Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          className="availability-calendar-date-picker"
        />
      </div>

      <div className="availability-calendar-picker">
        <h2 className="availability-calendar-header">Select Start Time</h2>
        <DatePicker
          selected={startTime}
          onChange={handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60} // Set time intervals to 60 minutes (1 hour)
          dateFormat="h:mm aa"
          className="availability-calendar-time-picker"
        />
      </div>

      <div className="availability-calendar-picker">
        <h2 className="availability-calendar-header">Select End Time</h2>
        <DatePicker
          selected={endTime}
          onChange={handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60} // Set time intervals to 60 minutes (1 hour)
          dateFormat="h:mm aa"
          className="availability-calendar-time-picker"
        />
      </div>

      <div className="availability-calendar-picker">
        <h2 className="availability-calendar-header">Time Duration</h2>
        <p className="availability-calendar-time-duration">{timeDuration.toFixed(2)} hours</p>
      </div>
      <button className="cool-listing-book-button" onClick={handleReserveClick}>
        Reserve
      </button>
    </div>
  );
};

export default AvailabilityCalendar;
