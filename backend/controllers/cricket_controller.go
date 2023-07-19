package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/balasathya16/FoxBooking/db"
	"github.com/balasathya16/FoxBooking/models"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/gorilla/mux"
)

func CreateCricketCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse the JSON data from the request body
	var court models.CricketCourt
	err := json.NewDecoder(r.Body).Decode(&court)
	if err != nil {
		log.Println("Error decoding JSON data:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Error decoding JSON data: " + err.Error())
		return
	}

	courtID, err := uuid.NewUUID()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to generate court ID")
		return
	}

	// Create a folder in S3 with the same name as the courtID
	err = createFolderInS3(courtID.String(), "cricket-court-images")
	if err != nil {
		log.Println("Error creating folder in S3:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to create folder in S3")
		return
	}

	// Save the court to the database
	database, err := db.ConnectDB()
	if err != nil {
		log.Println("Error connecting to the database:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_courts")

	// Insert the court document
	_, err = collection.InsertOne(context.TODO(), court)
	if err != nil {
		log.Println("Error inserting court into the database:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to insert court")
		return
	}

	court.Images = nil // Clear the images field as we are not uploading images
	court.ID = courtID // Set the court ID with the generated UUID

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(court)
}

func createFolderInS3(courtID string, bucketName string) error {
	// Create a new AWS session
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-south-1"),
		// You can provide your AWS credentials here or use environment variables.
	})
	if err != nil {
		return err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	// Create the UUID folder on S3
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(courtID + "/"), // Include trailing slash to create a folder
	})
	if err != nil {
		return err
	}

	return nil
}

func GetAllCricketCourts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieve the search query from the request
	query := r.URL.Query().Get("query")

	// Retrieve all cricket courts from the database
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
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
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch cricket courts")
		return
	}
	defer cursor.Close(context.TODO())

	// Iterate over the cursor and collect all courts
	var courts []models.CricketCourt
	for cursor.Next(context.TODO()) {
		var court models.CricketCourt
		if err := cursor.Decode(&court); err != nil {
			// Handle the error appropriately
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode("Failed to decode cricket court")
			return
		}
		courts = append(courts, court)
	}

	if err := cursor.Err(); err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch cricket courts")
		return
	}

	if len(courts) == 0 {
		// Return an empty array if no cricket courts are found
		json.NewEncoder(w).Encode([]models.CricketCourt{})
		return
	}

	json.NewEncoder(w).Encode(courts)
}

// GetCricketCourtByID retrieves a single cricket court from the database

func GetCricketCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	courtIDStr := params["id"]

	// Parse the courtID string into a UUID
	courtID, err := uuid.Parse(courtIDStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid court ID")
		return
	}

	// Retrieve the cricket court from the database using MongoDB driver based on courtID
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_courts")

	// Define a filter to find the court by ID
	filter := bson.M{"id": courtID}

	// Find the court document in the collection
	var court models.CricketCourt
	err = collection.FindOne(context.TODO(), filter).Decode(&court)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode("Court not found")
			return
		}

		// Handle other errors appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch court")
		return
	}

	json.NewEncoder(w).Encode(court)
}

// EditCricketCourt edits a single cricket court in the database
func EditCricketBooking(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	bookingID := params["id"]

	// Retrieve the cricket booking from the database using MongoDB driver based on bookingID
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_bookings")

	// Define a filter to find the booking by ID
	filter := bson.M{"id": bookingID}

	// Find the booking document in the collection
	var booking models.CricketBooking
	err = collection.FindOne(context.TODO(), filter).Decode(&booking)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode("Booking not found")
			return
		}

		// Handle other errors appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch booking")
		return
	}

	// Update the booking details based on the request body
	err = json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	// Update the booking document in the collection
	update := bson.M{"$set": booking}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to update booking")
		return
	}

	json.NewEncoder(w).Encode(booking)
}

// payForBooking pays for a single cricket booking in the database

func PayForBooking(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	bookingID := params["id"]

	// Retrieve the cricket booking from the database using MongoDB driver based on bookingID
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_bookings")

	// Define a filter to find the booking by ID
	filter := bson.M{"id": bookingID}

	// Find the booking document in the collection
	var booking models.CricketBooking
	err = collection.FindOne(context.TODO(), filter).Decode(&booking)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode("Booking not found")
			return
		}

		// Handle other errors appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch booking")
		return
	}

	// Perform the payment processing logic here
	// ...

	// Update the booking status to "paid" or handle the payment-related data
	booking.Status = "paid"

	// Update the booking document in the collection
	update := bson.M{"$set": booking}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to update booking")
		return
	}

	json.NewEncoder(w).Encode(booking)
}
