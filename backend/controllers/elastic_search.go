package controllers

import (
    "context"
    "log"

    "github.com/elastic/go-elasticsearch/v8"
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
