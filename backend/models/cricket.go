package models

import (
	"time"

	"github.com/google/uuid"
)

type CricketCourt struct {
	ID            uuid.UUID        `json:"id,omitempty"`
	Location      string           `json:"location"`
	NetsAvailable int              `json:"netsAvailable"`
	BookingTime   []CricketBooking `json:"bookingTime"`
	// Add other relevant fields for cricket

	// Additional fields
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	ContactEmail string   `json:"contactEmail"`
	ContactPhone string   `json:"contactPhone"`
	Images       []string `json:"images"` // Separate field for storing image URLs

	// New field for image file handling
	ImageFiles []*ImageFile `json:"-"`
	// Add more fields for the cricket court, such as pricing, amenities, etc.
}

type ImageFile struct {
	Filename string
	Data     []byte
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
