package models

import "time"

type CricketCourt struct {
	ID            string           `json:"id,omitempty"`
	Location      string           `json:"location"`
	NetsAvailable int              `json:"netsAvailable"`
	BookingTime   []CricketBooking `json:"bookingTime"`
	// Add other relevant fields for cricket
}

type CricketBooking struct {
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
	Status    string    `json:"status"`
	// Add other relevant fields for cricket bookings
}
