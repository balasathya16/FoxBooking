package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/balasathya16/FoxBooking/models"

	"github.com/gorilla/mux"
)

func CreateBadmintonCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var court models.BadmintonCourt
	_ = json.NewDecoder(r.Body).Decode(&court)

	// Save the court to the database using MongoDB driver

	json.NewEncoder(w).Encode(court)
}

func GetBadmintonCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	courtID := params["id"]

	// Retrieve the court from the database using MongoDB driver based on courtID

	json.NewEncoder(w).Encode(court)
}
