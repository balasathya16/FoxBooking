package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/balasathya16/FoxBooking/models"

	"github.com/gorilla/mux"
)

func CreateFootballCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var court models.FootballCourt
	_ = json.NewDecoder(r.Body).Decode(&court)

	// Save the court to the database using MongoDB driver

	json.NewEncoder(w).Encode(court)
}

func GetFootballCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	courtID := params["id"]

	// Retrieve the football court from the database using MongoDB driver based on courtID
	// Implement the necessary logic to fetch the court details and assign it to the `court` variable

	court := models.FootballCourt{
		ID:       courtID,
		Location: "Sample Location",
		// Set other properties based on the fetched data
	}

	json.NewEncoder(w).Encode(court)
}
