package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/typesense/typesense-go/typesense"
	
)

// SearchCricketCourts handles the search for cricket courts.
func SearchCricketCourts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieve the search query from the request
	query := r.URL.Query().Get("query")

	// Initialize Typesense client
	clientOptions := typesense.DefaultClientOptions().
		SetApikey("YOUR_API_KEY").
		SetNodes([]typesense.Node{
			{
				Host:     "localhost",
				Port:     8108,
				Protocol: "http",
			},
		})
	client := typesense.NewClient(clientOptions)

	// Define the search parameters for Typesense
	searchParameters := typesense.SearchParameters{
		Q:       query,
		QueryBy: []string{"name", "location"}, // Fields to search in
	}

	 // Perform the search using Typesense
	 searchResults, err := client.Collection("your_index_name").Search(searchParameters)
	 if err != nil {
		 http.Error(w, "Failed to perform search", http.StatusInternalServerError)
		 return
	 }

	// Return the search results as JSON
	json.NewEncoder(w).Encode(searchResults)
}
