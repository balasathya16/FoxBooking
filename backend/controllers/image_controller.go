package controllers

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"io/ioutil"
	"mime/multipart" // Import the multipart package
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
)

const (
	S3BucketURL = "http://cricket-court-images.s3-website.ap-south-1.amazonaws.com/"
	AWSRegion   = "ap-south-1"
)

func UploadImage(courtID uuid.UUID, file *multipart.FileHeader, format string) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	imageData, err := ioutil.ReadAll(src)
	if err != nil {
		return "", err
	}

	compressedImageData, err := compressImage(imageData, format)
	if err != nil {
		return "", err
	}

	imageURL, err := uploadToS3(courtID, compressedImageData, format)
	if err != nil {
		return "", err
	}

	return imageURL, nil
}


func compressImage(imageData []byte, format string) ([]byte, error) {
	img, _, err := image.Decode(bytes.NewReader(imageData))
	if err != nil {
		return nil, err
	}

	var buf bytes.Buffer

	switch format {
	case "image/jpeg":
		jpegOptions := &jpeg.Options{Quality: 80}
		err = jpeg.Encode(&buf, img, jpegOptions)
	default:
		return nil, fmt.Errorf("unsupported image format: %s", format)
	}

	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

func uploadToS3(courtID uuid.UUID, imageData []byte, format string) (string, error) {
    sess, err := session.NewSession(&aws.Config{
        Region: aws.String(AWSRegion),
    })
    if err != nil {
        return "", err
    }

    svc := s3.New(sess)

    imageUUID, err := uuid.NewUUID()
    if err != nil {
        return "", err
    }

    imageKey := courtID.String() + "/" + imageUUID.String() + getExtension(format)
    _, err = svc.PutObject(&s3.PutObjectInput{
        Bucket:        aws.String("cricket-court-images"),
        Key:           aws.String(imageKey),
        Body:          bytes.NewReader(imageData),
        ContentType:   aws.String(getContentType(format)), // Set the content type based on format
        ContentLength: aws.Int64(int64(len(imageData))),
    })
    if err != nil {
        return "", err
    }

    return S3BucketURL + imageKey, nil
}

func getExtension(format string) string {
	switch format {
	case "image/jpeg":
		return ".jpg"
	case "image/png":
		return ".png"
	// Add more cases for other image formats if needed
	default:
		return ".jpg" // Default to .jpg if format is unknown
	}
}

func getContentType(format string) string {
	switch format {
	case "image/jpeg":
		return "image/jpeg"
	case "image/png":
		return "image/png"
	// Add more cases for other image formats if needed
	default:
		return "image/jpeg" // Default to image/jpeg if format is unknown
	}
}

func saveImagesToS3(courtID uuid.UUID, r *http.Request) ([]string, error) {
    var imageURLs []string

    err := r.ParseMultipartForm(10 << 20) // 10 MB maximum file size (adjust as needed)
    if err != nil {
        return nil, err
    }

    files := r.MultipartForm.File["images"]

    for _, file := range files {
        // Open the uploaded image file
        src, err := file.Open()
        if err != nil {
            return nil, err
        }
        defer src.Close()

        imageData, err := ioutil.ReadAll(src)
        if err != nil {
            return nil, err
        }

        // Determine the format of the uploaded image (e.g., "image/jpeg", "image/png", etc.)
        format := http.DetectContentType(imageData)

        imageURL, err := uploadToS3(courtID, imageData, format) // Use the detected format
        if err != nil {
            return nil, err
        }

        imageURLs = append(imageURLs, imageURL)
    }

    return imageURLs, nil
}

