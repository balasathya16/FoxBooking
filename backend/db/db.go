package db

import (
	"context"
	"os"

	"github.com/balasathya16/FoxBooking/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() (*mongo.Database, error) {
	// Get the MongoDB connection string from the environment variable
	connectionString := os.Getenv("DB_CONNECTION_STRING")

	// Set up the MongoDB connection options
	clientOptions := options.Client().ApplyURI(connectionString)

	// Connect to the MongoDB database
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}

	// Get a handle to the database
	db := client.Database("FoxBooking")

	return db, nil
}

// SaveUser saves the user information to the database
func SaveUser(user models.User) error {
	// Connect to the MongoDB database
	db, err := ConnectDB()
	if err != nil {
		return err
	}

	// Get the collection from the database
	collection := db.Collection("users")

	// Insert the user document into the collection
	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		return err
	}

	return nil
}
