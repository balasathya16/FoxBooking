// location_controller.go

package controllers

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"os"

)

// LocationDetails represents the details obtained from the Google Places API
type LocationDetails struct {
    PlaceID         string       `json:"place_id"`
    Name            string       `json:"name"`
    FormattedAddress string     `json:"formatted_address"`
    Types           []string     `json:"types"`
    Latitude        float64      `json:"latitude"`
    Longitude       float64      `json:"longitude"`
    Rating          float64      `json:"rating"`
    // ... Add more fields as needed based on the Google Places API response
}


func getLocationDetailsFromAPI(location string) (*LocationDetails, error) {
    LoadEnv()
    apiKey := os.Getenv("MAPS_API_KEY")
    url := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%s&inputtype=textquery&fields=formatted_address&key=%s", location, apiKey)

    fmt.Println("API Request URL:", url) // Print the request URL for debugging

    resp, err := http.Get(url)
    if err != nil {
        fmt.Println("Error making request to Google Places API:", err)
        return nil, err
    }
    defer resp.Body.Close()

    // Read the response body
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response body:", err)
        return nil, err
    }

    fmt.Println("API Response Body:", string(body)) // Print the response body for debugging

    // Unmarshal the response JSON into the LocationDetails struct
    var details LocationDetails
    err = json.Unmarshal(body, &details)
    if err != nil {
        fmt.Println("Error unmarshaling JSON:", err)
        return nil, err
    }

    fmt.Println("Location Details:", details) // Print the location details for debugging

    return &details, nil
}
