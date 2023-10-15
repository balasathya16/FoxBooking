package controllers

import (
    "bytes"
	"context"
	"encoding/json"
	"log"
	"fmt"


    "github.com/elastic/go-elasticsearch/v8"
	"github.com/balasathya16/FoxBooking/models"
)

var esClient *elasticsearch.Client

func initElasticsearch() {
    cfg := elasticsearch.Config{
        Addresses: []string{"http://localhost:9200"},
    }

    var err error
    esClient, err = elasticsearch.NewClient(cfg)
    if err != nil {
        log.Fatalf("Error creating the Elasticsearch client: %v", err)
    }
}

func searchCourts(query string) ([]models.CricketCourt, error) {
	query := r.URL.Query().Get("query")

	// Call the searchCourts function to search for courts
	courts, err := searchCourts(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Serialize the response to JSON
	jsonResponse, err := json.Marshal(courts)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the response content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response
	w.Write(jsonResponse)
}
	var courts []models.CricketCourt

	// Define the search request for Elasticsearch
	searchRequest := map[string]interface{}{
		"query": map[string]interface{}{
			"query_string": map[string]interface{}{
				"query": query,
			},
		},
	}

	// Encode the search request to a JSON buffer
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(searchRequest); err != nil {
		return nil, err
	}

	// Perform the search in Elasticsearch
	res, err := esClient.Search(
		esClient.Search.WithContext(context.Background()),
		esClient.Search.WithIndex("cricket_courts"), // Elasticsearch index name
		esClient.Search.WithBody(&buf),              // Set the request body
	)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	// Parse the search response and extract the courts
	if res.IsError() {
		return nil, fmt.Errorf("Elasticsearch error: %s", res.String())
	}

	var response map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return nil, err
	}

	hits, _ := response["hits"].(map[string]interface{})["hits"].([]interface{})

	for _, hit := range hits {
		source, _ := hit.(map[string]interface{})["_source"].(map[string]interface{})
		var court models.CricketCourt

		// Unmarshal the Elasticsearch document into a CricketCourt struct
		data, _ := json.Marshal(source)
		if err := json.Unmarshal(data, &court); err != nil {
			return nil, err
		}

		courts = append(courts, court)
	}

	return courts, nil
}

