package controllers

import (
	"bytes"
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strconv"

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

const (
	S3BucketURL = "http://cricket-court-images.s3-website.ap-south-1.amazonaws.com/"
	AWSRegion   = "ap-south-1"
)

func CreateCricketCourt(w http.ResponseWriter, r *http.Request) {
	// Parse the form data to get the uploaded image
	err := r.ParseMultipartForm(10 << 20) // 10 MB maximum file size (adjust as needed)
	if err != nil {
		log.Println("Error parsing form data:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Error parsing form data: " + err.Error())
		return
	}

	courtID, err := uuid.NewUUID()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to generate court ID")
		return
	}

	// Save images to S3 and update the court.Images with the S3 URLs
	court := models.CricketCourt{
		ID:       courtID,
		Location: r.FormValue("location"),
	}

	// Parse "netsAvailable" as an integer
	netsAvailable, err := strconv.Atoi(r.FormValue("netsAvailable"))
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid value for netsAvailable")
		return
	}
	court.NetsAvailable = netsAvailable

	court.Name = r.FormValue("name")
	court.Description = r.FormValue("description")
	court.ContactEmail = r.FormValue("contactEmail")
	court.ContactPhone = r.FormValue("contactPhone")

	err = saveImagesToS3(&court, courtID, r)
	if err != nil {
		log.Println("Error saving images to S3:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to save images to S3")
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

	// Save the images' URLs to the court.Images field
	for _, image := range court.ImageFiles {
		imageURL := S3BucketURL + courtID.String() + "/" + image.Filename
		court.Images = append(court.Images, imageURL)
	}

	// Update the court document with the images' URLs
	_, err = collection.UpdateOne(
		context.TODO(),
		bson.M{"_id": court.ID},
		bson.M{"$set": bson.M{"images": court.Images}},
	)
	if err != nil {
		log.Println("Error updating court with images' URLs:", err)
		// You may handle the error accordingly; this example just logs the error.
	}

	court.Images = nil // Clear the images field as we are not uploading images

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(court)
}

func UploadImage(courtID uuid.UUID, file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// Read the image file data
	imageData, err := ioutil.ReadAll(src)
	if err != nil {
		return "", err
	}

	// Create a new AWS session
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(AWSRegion),
		// You can provide your AWS credentials here or use environment variables.
	})
	if err != nil {
		return "", err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	// Upload the image file to S3 with a unique name (combining court UUID and image file name)
	imageKey := courtID.String() + "/" + filepath.Base(file.Filename)
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String("cricket-court-images"), // Use your S3 bucket name here
		Key:    aws.String(imageKey),
		Body:   bytes.NewReader(imageData),
	})
	if err != nil {
		return "", err
	}

	return S3BucketURL + imageKey, nil
}

func saveImagesToS3(court *models.CricketCourt, courtID uuid.UUID, r *http.Request) error {
	err := r.ParseMultipartForm(10 << 20) // 10 MB maximum file size (adjust as needed)
	if err != nil {
		return err
	}

	// Get the images from the request form
	images := r.MultipartForm.File["images"]
	if len(images) == 0 {
		return nil // No images uploaded, nothing to do.
	}

	for _, image := range images {
		imageURL, err := UploadImage(courtID, image)
		if err != nil {
			return err
		}
		court.Images = append(court.Images, imageURL)
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

// EditCricketBooking edits a single cricket booking in the database
// EditCricketBooking edits a single cricket booking in the database
func EditCricketBooking(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	bookingID := params["id"]

	// Log the bookingID for debugging purposes
	log.Println("BookingID:", bookingID)

	// Retrieve the cricket booking from the database using MongoDB driver based on bookingID
	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		log.Println("Database connection error:", err)
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
			log.Println("Booking not found in the database")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode("Booking not found")
			return
		}

		// Handle other errors appropriately
		log.Println("Failed to fetch booking from the database:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to fetch booking")
		return
	}

	// Update the booking details based on the request body
	err = json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		log.Println("Invalid request body:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	// Handle image upload and update the booking document with image URLs
	err = saveImagesToS3ForBooking(&booking, bookingID, r)
	if err != nil {
		log.Println("Failed to save images to S3:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to save images to S3")
		return
	}

	// Update the booking document in the collection with the new image URLs
	update := bson.M{"$set": booking}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		// Handle the error appropriately
		log.Println("Failed to update booking in the database:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to update booking")
		return
	}

	json.NewEncoder(w).Encode(booking)
}

// Handle image upload and update the booking document with image URLs
func saveImagesToS3ForBooking(booking *models.CricketBooking, bookingID string, r *http.Request) error {
	err := r.ParseMultipartForm(10 << 20) // 10 MB maximum file size (adjust as needed)
	if err != nil {
		return err
	}

	// Get the images from the request form
	images := r.MultipartForm.File["images"]
	if len(images) == 0 {
		return nil // No images uploaded, nothing to do.
	}

	for _, image := range images {
		imageURL, err := UploadImage(uuid.MustParse(bookingID), image)
		if err != nil {
			return err
		}
		booking.Images = append(booking.Images, imageURL)
	}

	return nil
}

// DeleteAllCricketCourts deletes all cricket courts from the database
func DeleteAllCricketCourts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	database, err := db.ConnectDB()
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Database connection error")
		return
	}

	// Get the collection
	collection := database.Collection("cricket_courts")

	// Delete all documents from the collection (delete all cricket courts)
	_, err = collection.DeleteMany(context.TODO(), bson.M{})
	if err != nil {
		// Handle the error appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to delete cricket courts")
		return
	}

	json.NewEncoder(w).Encode("All cricket courts deleted successfully")
}

// DeleteCricketCourtByID deletes a single cricket court by ID from the database
func DeleteCricketCourtByID(w http.ResponseWriter, r *http.Request) {
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
	err = collection.FindOneAndDelete(context.TODO(), filter).Decode(&court)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode("Court not found")
			return
		}

		// Handle other errors appropriately
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Failed to delete court")
		return
	}

	// Perform additional cleanup or tasks if needed
	// ...

	json.NewEncoder(w).Encode("Court deleted successfully")
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
