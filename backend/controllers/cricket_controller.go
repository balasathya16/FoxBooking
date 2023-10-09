package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"
	"fmt"

	"github.com/balasathya16/FoxBooking/db"
	"github.com/balasathya16/FoxBooking/models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateCricketCourt(w http.ResponseWriter, r *http.Request) {


	fmt.Println("Request Method:", r.Method)
	fmt.Println("Request URL:", r.URL)
	fmt.Println("Request Headers:", r.Header)
	// Parse the form data to get the uploaded image
	err := r.ParseMultipartForm(10 << 20) // 10 MB maximum file size (adjust as needed)
	if err != nil {
		handleError(w, http.StatusBadRequest, "Error parsing form data: "+err.Error())
		return
	}

		// Fetch location details using the Google Places API
		location := r.FormValue("location")
		locationDetails, err := getLocationDetailsFromAPI(location)
		if err != nil {
			handleError(w, http.StatusInternalServerError, "Failed to fetch location details")
			return
		}

		   // Now you have the location details, you can use them as needed.
    // For example, you can display the formatted address to the user.
    formattedAddress := locationDetails.FormattedAddress
    fmt.Println("Formatted Address:", formattedAddress)



	courtID, err := uuid.NewUUID()
	if err != nil {
		handleError(w, http.StatusInternalServerError, "Failed to generate court ID")
		return
	}

	// Convert the UUID string to a github.com/google/uuid.UUID type
	courtUUID := uuid.MustParse(courtID.String())

	court := models.CricketCourt{
		ID:             courtUUID,
		Location:       r.FormValue("location"),
		Name:           r.FormValue("name"),
		Description:    r.FormValue("description"),
		ContactEmail:   r.FormValue("contactEmail"),
		ContactPhone:   r.FormValue("contactPhone"),
		NetsAvailable:  parseIntegerValue(r.FormValue("netsAvailable")),
		PricePerHour:   parseFloatValue(r.FormValue("pricePerHour")),
		Images:         nil,
	}

	// Call the saveImagesToS3 function to handle image upload
	imageURLs, err := saveImagesToS3(courtID, r)
	if err != nil {
		handleError(w, http.StatusInternalServerError, "Failed to save images to S3")
		return
	}

	// Set the court's Images field to the image URLs
	court.Images = imageURLs

	err = saveCricketCourtToDB(&court)
	if err != nil {
		handleError(w, http.StatusInternalServerError, "Failed to save cricket court to DB")
		return
	}

	court.Images = nil // Clear the images field

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(court)
}


func parseIntegerValue(value string) int {
	parsedValue, err := strconv.Atoi(value)
	if err != nil {
		return 0
	}
	return parsedValue
}

func parseFloatValue(value string) float64 {
	parsedValue, err := strconv.ParseFloat(value, 64)
	if err != nil {
		return 0.0
	}
	return parsedValue
}

func saveCricketCourtToDB(court *models.CricketCourt) error {
	database, err := db.ConnectDB()
	if err != nil {
		return err
	}

	collection := database.Collection("cricket_courts")

	_, err = collection.InsertOne(context.TODO(), court)
	if err != nil {
		return err
	}

	return nil
}

func handleError(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(message)
}

// Other functions (GetAllCricketCourts, GetCricketCourtByID, DeleteAllCricketCourts, DeleteCricketCourtByID) remain unchanged.


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

func EditCricketCourt(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    params := mux.Vars(r)
    courtIDStr := params["id"]

    courtID, err := uuid.Parse(courtIDStr)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode("Invalid court ID")
        return
    }

    var updatedCourt models.CricketCourt
    err = json.NewDecoder(r.Body).Decode(&updatedCourt)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode("Invalid request payload")
        return
    }

    // Update the court in the database
    err = updateCricketCourt(courtID, &updatedCourt)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode("Failed to update court")
        return
    }

    json.NewEncoder(w).Encode("Court updated successfully")
}

func updateCricketCourt(courtID uuid.UUID, updatedCourt *models.CricketCourt) error {
    database, err := db.ConnectDB()
    if err != nil {
        return err
    }

    collection := database.Collection("cricket_courts")

    filter := bson.M{"id": courtID}
    update := bson.M{
        "$set": bson.M{
            "name":           updatedCourt.Name,
            "description":    updatedCourt.Description,
            "contactEmail":   updatedCourt.ContactEmail,
            "contactPhone":   updatedCourt.ContactPhone,
            "pricePerHour":   updatedCourt.PricePerHour,
            // Update other fields as needed
        },
    }

    _, err = collection.UpdateOne(context.TODO(), filter, update)
    if err != nil {
        return err
    }

    return nil
}
