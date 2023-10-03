// payment_controller.go

package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/paymentintent"
	"github.com/google/uuid"
	"os"
)

// CreatePaymentIntent creates a Stripe Payment Intent for a booking
func CreatePaymentIntent(w http.ResponseWriter, r *http.Request) {
	LoadEnv() // Load environment variables from .env

	// Parse the request data, which should include the cricket court UUID and amount
	var requestData struct {
		CricketCourtUUID string  `json:"cricketCourtUUID"`
		Amount           float64 `json:"amount"`
	}
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		handlePaymentError(w, http.StatusBadRequest, "Invalid request data")
		return
	}

	// Generate a booking UUID
	bookingID, err := uuid.NewUUID()
	if err != nil {
		handlePaymentError(w, http.StatusInternalServerError, "Failed to generate booking UUID")
		return
	}
	bookingUUID := bookingID.String()

	// Get Stripe secret key from environment variable
	stripeKey := os.Getenv("STRIPE_SECRET_KEY")

	// Configure your Stripe secret key
	stripe.Key = stripeKey

	// Create a Stripe Payment Intent
	intentParams := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(requestData.Amount * 100)), // Amount in cents
		Currency: stripe.String("usd"),                         // Change to appropriate currency code
	}
	intentParams.AddMetadata("bookingUUID", bookingUUID)                // Use the generated booking UUID
	intentParams.AddMetadata("cricketCourtUUID", requestData.CricketCourtUUID)

	intent, err := paymentintent.New(intentParams)
	if err != nil {
		handlePaymentError(w, http.StatusInternalServerError, "Failed to create Payment Intent")
		return
	}

	// Return the payment intent's client secret and booking UUID to frontend
	jsonResponse := map[string]string{
		"clientSecret": intent.ClientSecret,
		"bookingUUID":  bookingUUID, // Include the generated booking UUID in the response
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jsonResponse)
}

func handlePaymentError(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(message)
}

// Rest of the code for GetPaymentIntent remains the same
