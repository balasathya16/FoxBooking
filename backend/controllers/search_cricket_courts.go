package controllers

import (
    // Other imports
    "context"
    "github.com/balasathya16/FoxBooking/db" // Import the db package
    "github.com/balasathya16/FoxBooking/models"
    "go.mongodb.org/mongo-driver/bson"
)

func searchCricketCourts(query string) ([]models.CricketCourt, error) {
    database, err := db.ConnectDB()
    if err != nil {
        return nil, err
    }

    collection := database.Collection("cricket_courts")

    // Define a filter to find the courts by name or location
    filter := bson.M{
        "$or": []bson.M{
            {"name": bson.M{"$regex": query, "$options": "i"}},
            {"location": bson.M{"$regex": query, "$options": "i"}},
        },
    }

    // Find the court documents in the collection based on the filter
    cursor, err := collection.Find(context.TODO(), filter)
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())

    // Iterate over the cursor and collect all courts
    var courts []models.CricketCourt
    for cursor.Next(context.TODO()) {
        var court models.CricketCourt
        if err := cursor.Decode(&court); err != nil {
            return nil, err
        }
        courts = append(courts, court)
    }

    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return courts, nil
}
