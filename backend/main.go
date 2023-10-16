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

	// CORS configuration
	cors := func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Allow requests from any origin
			w.Header().Set("Access-Control-Allow-Origin", "*")
			// Allow the following HTTP methods
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			// Allow the following headers
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			// If it's a preflight request, respond with 200 status code
			if r.Method == http.MethodOptions {
				return
			}

			handler.ServeHTTP(w, r)
		})
	}

	// Wrap the router with the CORS middleware
	handler := cors(router)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
