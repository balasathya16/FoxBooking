// location_controller.go

package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
)

// LocationDetails represents the details obtained from the Google Places API
type LocationDetails struct {
	PlaceID          string   `json:"place_id"`
	Name             string   `json:"name"`
	FormattedAddress string   `json:"formatted_address"`
	Types            []string `json:"types"`
	Latitude         float64  `json:"latitude"`
	Longitude        float64  `json:"longitude"`
	Rating           float64  `json:"rating"`
	// ... Add more fields as needed based on the Google Places API response
}

func getLocationDetailsFromAPI(location string) (*LocationDetails, error) {
	LoadEnv()
	apiKey := os.Getenv("MAPS_API_KEY")
	urlEncodedLocation := url.QueryEscape(location)

	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%s&inputtype=textquery&fields=formatted_address&key=%s", urlEncodedLocation, apiKey)

	fmt.Println("API Request URL:", url) // Print the request URL for debugging

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error making request to Google Places API:", err)
		return nil, err
	}
	defer resp.Body.Close()

	// Check the HTTP status code
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Google Places API returned non-OK status:", resp.Status)
		return nil, fmt.Errorf("Google Places API returned non-OK status: %s", resp.Status)
	}

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return nil, err
	}

	fmt.Println("API Response Body:", string(body)) // Print the response body for debugging

	// Check if the API response indicates an error
	var errorResponse struct {
		ErrorMessage string `json:"error_message"`
		Status       string `json:"status"`
	}

	if err := json.Unmarshal(body, &errorResponse); err == nil && errorResponse.ErrorMessage != "" {
		return nil, fmt.Errorf("Google Places API returned an error: %s, Status: %s", errorResponse.ErrorMessage, errorResponse.Status)
	}

	// Unmarshal the response JSON into the LocationDetails struct
	var details LocationDetails
	err = json.Unmarshal(body, &details)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return nil, err
	}

	fmt.Println("Location Details:", details) // Print the location details for debugging

	fmt.Println("Unmarshaled Location Details:", details)

	// Print response status code and body
	fmt.Println("API Response Status:", resp.Status)
	fmt.Println("API Response Body:", string(body))

	return &details, nil
}
