package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"path/filepath"

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

	// Parse the multipart/form-data to get the images
	err := r.ParseMultipartForm(10 << 20) // 10 MB max image size
	if err != nil {
		log.Println("Error parsing form data:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	// Extract JSON data from the "file" form field
	dataFile, _, err := r.FormFile("file")
	if err != nil {
		log.Println("Error retrieving JSON data:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Error retrieving JSON data")
		return
	}
	defer dataFile.Close()

	var court models.CricketCourt
	err = json.NewDecoder(dataFile).Decode(&court)
	if err != nil {
		log.Println("Error decoding JSON data:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Error decoding JSON data: " + err.Error())
		return
	}

	// Upload images to Amazon S3 and get the image URLs
	imageURLs, err := uploadImagesToS3(r, court.ID.String(), "cricket-court-images") // Pass court.ID.String() as courtID
	if err != nil {
		log.Println("Error uploading images:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to upload images")
		return
	}
	court.Images = imageURLs

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

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(court)
}

func uploadImagesToS3(r *http.Request, courtID, bucketName string) ([]string, error) {
	// Parse the multipart/form-data request to get the images
	err := r.ParseMultipartForm(10 << 20) // 10 MB max image size
	if err != nil {
		log.Println("Error parsing form data:", err)
		return nil, err
	}

	// Create an AWS session
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-south-1"), // Replace with your AWS region, e.g., "us-east-1"
	})
	if err != nil {
		log.Println("Error creating AWS session:", err)
		return nil, err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	creds, err := sess.Config.Credentials.Get()
	if err != nil {
		log.Println("Error getting AWS credentials:", err)
	} else {
		log.Println("Using AWS credentials with AccessKeyID:", creds.AccessKeyID)
	}

	var imageURLs []string

	// Create the UUID folder on S3
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(courtID + "/"), // Include trailing slash to create a folder
	})
	if err != nil {
		log.Printf("Error creating UUID folder '%s': %s", courtID, err)
		return nil, err
	}

	// Iterate over the uploaded images
	for _, headers := range r.MultipartForm.File {
		for i := range headers {
			file, err := headers[i].Open()
			if err != nil {
				log.Printf("Error opening uploaded image: %s", err)
				return nil, err
			}
			defer file.Close()

			// Use the original image name as the file name
			fileName := filepath.Join(courtID, filepath.Base(headers[i].Filename))

			// Upload the image to S3
			_, err = svc.PutObject(&s3.PutObjectInput{
				Bucket: aws.String(bucketName),
				Key:    aws.String(fileName),
				Body:   file,
			})
			if err != nil {
				log.Printf("Error uploading image '%s': %s", fileName, err)
				return nil, err
			}

			// Generate the image URL
			imageURL := "https://" + bucketName + ".s3.amazonaws.com/" + fileName
			imageURLs = append(imageURLs, imageURL)
		}
	}

	return imageURLs, nil
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
