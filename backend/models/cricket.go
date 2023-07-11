package models

import "time"

type CricketCourt struct {
	ID            string           `json:"id,omitempty"`
	Location      string           `json:"location"`
	NetsAvailable int              `json:"netsAvailable"`
	BookingTime   []CricketBooking `json:"bookingTime"`
	// Add other relevant fields for cricket

	// Additional fields
	Name         string `json:"name"`
	Description  string `json:"description"`
	ContactEmail string `json:"contactEmail"`
	ContactPhone string `json:"contactPhone"`
	// Add more fields for the cricket court, such as pricing, amenities, etc.
}

type CricketBooking struct {
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
	Status    string    `json:"status"`
	// Add other relevant fields for cricket bookings

	// Additional fields
	UserID    string `json:"userID"`
	PaymentID string `json:"paymentID"`
}
