package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/balasathya16/FoxBooking/db"
	"github.com/balasathya16/FoxBooking/models"
)

func SignUpWithEmail(w http.ResponseWriter, r *http.Request) {
	// Parse the request body to get the user email
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		// Handle error
		// Return appropriate response to the client
	}

	var user models.User
	err = json.Unmarshal(body, &user)
	if err != nil {
		// Handle error
		// Return appropriate response to the client
	}

	// Store the user in the database
	err = db.SaveUser(user)
	if err != nil {
		// Handle error
		// Return appropriate response to the client
	}

	// Return a success response to the client
	fmt.Fprintf(w, "User signed up successfully!")
}
