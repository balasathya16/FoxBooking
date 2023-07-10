package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"github.com/balasathya16/FoxBooking/routes"
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

	log.Fatal(http.ListenAndServe(":8000", router))
}
