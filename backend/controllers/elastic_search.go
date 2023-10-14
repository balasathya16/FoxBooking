package controllers

import (
    "context"
    "log"

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
    var courts []models.CricketCourt

    // Define the search request
    searchRequest := map[string]interface{}{
        "query": map[string]interface{}{
            "query_string": map[string]interface{}{
                "query": query,
            },
        },
    }

    // Perform the search
    res, err := esClient.Search(
        esClient.Search.WithContext(context.Background()),
        esClient.Search.WithIndex("cricket_courts"),  // Elasticsearch index name
        esClient.Search.WithBodyJSON(searchRequest),
    )
    if err != nil {
        return nil, err
    }
    defer res.Body.Close()

    // Parse the search response and extract the courts
    // (Assuming your Elasticsearch documents map to the CricketCourt struct)
    // ...

    return courts, nil
}
