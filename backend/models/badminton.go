package models

import "time"

type BadmintonCourt struct {
	ID          string             `json:"id,omitempty"`
	Location    string             `json:"location"`
	CourtType   string             `json:"courtType"`
	BookingTime []BadmintonBooking `json:"bookingTime"`
	// Add other relevant fields for badminton
}

type BadmintonBooking struct {
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
	Status    string    `json:"status"`
	// Add other relevant fields for badminton bookings
}
