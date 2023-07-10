package models

type User struct {
	ID              string `json:"id"`
	Email           string `json:"email"`
	FullName        string `json:"fullName"`
	PhoneNumber     string `json:"phoneNumber"`
	Address         string `json:"address"`
	DateOfBirth     string `json:"dateOfBirth"`
	ProfileImageURL string `json:"profileImageURL"`
	// Add more fields as per your requirements
}
