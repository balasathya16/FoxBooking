package routes

import (
	"github.com/balasathya16/FoxBooking/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	// Cricket Court Routes
	router.HandleFunc("/cricket", controllers.CreateCricketCourt).Methods("POST")
	router.HandleFunc("/cricket/{id}", controllers.GetCricketCourt).Methods("GET")
	router.HandleFunc("/cricket", controllers.GetAllCricketCourts).Methods("GET")
	router.HandleFunc("/cricket/{id}", controllers.EditCricketBooking).Methods("PUT")
	router.HandleFunc("/cricket/{id}/pay", controllers.PayForBooking).Methods("POST")
	// Football Court Routes
	router.HandleFunc("/football", controllers.CreateFootballCourt).Methods("POST")
	router.HandleFunc("/football/{id}", controllers.GetFootballCourt).Methods("GET")

	// Badminton Court Routes
	router.HandleFunc("/badminton", controllers.CreateBadmintonCourt).Methods("POST")
	router.HandleFunc("/badminton/{id}", controllers.GetBadmintonCourt).Methods("GET")
}
