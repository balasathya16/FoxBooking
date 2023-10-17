package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/typesense/typesense-go/typesense"
)

func SearchCricketCourts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieve the search query from the request
	query := r.URL.Query().Get("query")

	// Define the search parameters for Typesense
	searchParameters := &typesense.SearchParameters{
		Q:     query,
		QueryBy: []string{"name", "location"}, // Fields to search in
	}

	// Perform the search using Typesense
	searchResults, err := typesenseClient.Collectibles("your_index_name").Search(searchParameters)
	if err != nil {
		http.Error(w, "Failed to perform search", http.StatusInternalServerError)
		return
	}

	// Return the search results as JSON
	json.NewEncoder(w).Encode(searchResults)
}
