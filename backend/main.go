package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/balasathya16/FoxBooking/routes"
	"github.com/rs/cors" // Import the cors package
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	router := mux.NewRouter()

	// Setup routes
	routes.SetupRoutes(router)

	// CORS configuration
	corsHandler := cors.Default() // Use the default CORS configuration

	// Wrap the router with the CORS middleware
	handler := corsHandler.Handler(router)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
