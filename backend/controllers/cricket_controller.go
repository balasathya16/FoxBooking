package controllers

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/balasathya16/FoxBooking/db"
	"github.com/balasathya16/FoxBooking/models"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"encoding/base64"

	"github.com/gorilla/mux"
)

func CreateCricketCourt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var court models.CricketCourt
	err := json.NewDecoder(r.Body).Decode(&court)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	// Generate a new UUID for the court ID
	court.ID = uuid.New()

	// Save the court to the database
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_courts")

	// Insert the court document
	_, err = collection.InsertOne(context.TODO(), court)
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to insert court")
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(court)
}

// Upload images for cricket courts

func UploadImages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse the multipart form data
	err := r.ParseMultipartForm(10 << 20) // 10MB maximum file size
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Failed to parse multipart form data")
		return
	}

	// Get the court ID from the URL parameters
	courtID := mux.Vars(r)["id"]

	// Get the court from the database
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}
	collection := database.Collection("cricket_courts")
	filter := bson.M{"_id": courtID}
	var court models.CricketCourt
	err = collection.FindOne(context.TODO(), filter).Decode(&court)
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode("Court not found")
		return
	}

	// Retrieve the uploaded image files
	images := r.MultipartForm.File["images"]
	for _, file := range images {
		// Open the uploaded image file
		uploadedFile, err := file.Open()
		if err != nil {
			// Handle the error appropriately
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode("Failed to open uploaded image file")
			return
		}
		defer uploadedFile.Close()

		// Read the image data from the file
		imageData, err := ioutil.ReadAll(uploadedFile)
		if err != nil {
			// Handle the error appropriately
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode("Failed to read image data from file")
			return
		}

		// Convert the image data to base64-encoded string
		base64Data := base64.StdEncoding.EncodeToString(imageData)

		// Append the base64-encoded image data to the court's Images field
		court.Images = append(court.Images, base64Data)
	}

	// Save the updated court to the database
	_, err = collection.ReplaceOne(context.TODO(), filter, court)
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to save images to court")
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Images uploaded successfully")
}

// GetAllCricketCourts retrieves all cricket courts from the database
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
