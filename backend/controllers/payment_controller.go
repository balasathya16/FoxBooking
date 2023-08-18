package controllers

import (
    "encoding/json"
    "net/http"

    "github.com/stripe/stripe-go/v72"
    "github.com/stripe/stripe-go/v72/paymentintent"
)

// CreatePaymentIntent creates a Stripe Payment Intent for a booking
func CreatePaymentIntent(w http.ResponseWriter, r *http.Request) {
    // Parse the request data, which should include the booking UUID, cricket court UUID, and amount
    var requestData struct {
        BookingUUID      string  `json:"bookingUUID"`
        CricketCourtUUID string  `json:"cricketCourtUUID"`
        Amount           float64 `json:"amount"`
    }
    err := json.NewDecoder(r.Body).Decode(&requestData)
    if err != nil {
        handleError(w, http.StatusBadRequest, "Invalid request data")
        return
    }

    // Configure your Stripe secret key
    stripe.Key = "sk_test_51NfSEEG73qJpjALVckj8SuavsjaswtHEIVJxpB42uEzhUsafsRTsFe5Bj35A6R5LL3tEdY812Z1BsH4WW0hNduJH00roVxHGLJ"

    // Create a Stripe Payment Intent
    intentParams := &stripe.PaymentIntentParams{
        Amount:   stripe.Int64(int64(requestData.Amount * 100)), // Amount in cents
        Currency: stripe.String("usd"),                         // Change to appropriate currency code
    }
    intentParams.AddMetadata("bookingUUID", requestData.BookingUUID)
    intentParams.AddMetadata("cricketCourtUUID", requestData.CricketCourtUUID) // Add this line

    intent, err := paymentintent.New(intentParams)
    if err != nil {
        handleError(w, http.StatusInternalServerError, "Failed to create Payment Intent")
        return
    }

    // Return the payment intent's client secret to frontend
    jsonResponse := map[string]string{
        "clientSecret": intent.ClientSecret,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(jsonResponse)
}
