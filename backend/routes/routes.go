package routes

import (
	"github.com/balasathya16/FoxBooking/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	// Cricket Court Routes
	router.HandleFunc("/cricket", controllers.CreateCricketCourt).Methods("POST")
	router.HandleFunc("/cricket/{id}", controllers.EditCricketCourt).Methods("PUT")
	router.HandleFunc("/cricket/{id}", controllers.GetCricketCourt).Methods("GET")
	router.HandleFunc("/cricket", controllers.GetAllCricketCourts).Methods("GET")
	router.HandleFunc("/cricket", controllers.DeleteAllCricketCourts).Methods("DELETE")      // New route to delete all cricket courts
	router.HandleFunc("/cricket/{id}", controllers.DeleteCricketCourtByID).Methods("DELETE") // New route to delete a single cricket court

	router.HandleFunc("/cricket/search", controllers.SearchCricketCourts).Methods("GET")


	// Football Court Routes
	router.HandleFunc("/football", controllers.CreateFootballCourt).Methods("POST")
	router.HandleFunc("/football/{id}", controllers.GetFootballCourt).Methods("GET")

	// Badminton Court Routes
	router.HandleFunc("/badminton", controllers.CreateBadmintonCourt).Methods("POST")
	router.HandleFunc("/badminton/{id}", controllers.GetBadmintonCourt).Methods("GET")



	// payment route stripe
	router.HandleFunc("/api/create-payment-intent", controllers.CreatePaymentIntent).Methods("POST")

}
