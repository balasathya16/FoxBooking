package main

import (
	"log"
	"net/http"

	"github.com/balasathya16/FoxBooking/routes"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	// Call the SetupRoutes function to set up the routes
	routes.SetupRoutes(router)

	log.Fatal(http.ListenAndServe(":8000", router))
}
