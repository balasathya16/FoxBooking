package models

import "time"

type FootballCourt struct {
	ID          string            `json:"id,omitempty"`
	Location    string            `json:"location"`
	FieldSize   string            `json:"fieldSize"`
	BookingTime []FootballBooking `json:"bookingTime"`
	// Add other relevant fields for football
}

type FootballBooking struct {
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
	Status    string    `json:"status"`
	// Add other relevant fields for football bookings
}
