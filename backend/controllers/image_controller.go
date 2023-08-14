package controllers

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"io/ioutil"
	"net/http"
	"mime/multipart" // Import the multipart package

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
)

const (
	S3BucketURL = "http://cricket-court-images.s3-website.ap-south-1.amazonaws.com/"
	AWSRegion   = "ap-south-1"
)

func UploadImage(courtID uuid.UUID, file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	imageData, err := ioutil.ReadAll(src)
	if err != nil {
		return "", err
	}

	compressedImageData, err := compressImage(imageData, "image/jpeg")
	if err != nil {
		return "", err
	}

	imageURL, err := uploadToS3(courtID, compressedImageData)
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

func uploadToS3(courtID uuid.UUID, imageData []byte) (string, error) {
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

	imageKey := courtID.String() + "/" + imageUUID.String() + ".jpg"
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String("cricket-court-images"),
		Key:    aws.String(imageKey),
		Body:   bytes.NewReader(imageData),
	})
	if err != nil {
		return "", err
	}

	return S3BucketURL + imageKey, nil
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

		compressedImageData, err := compressImage(imageData, "image/jpeg")
		if err != nil {
			return nil, err
		}

		imageURL, err := uploadToS3(courtID, compressedImageData)
		if err != nil {
			return nil, err
		}

		imageURLs = append(imageURLs, imageURL)
	}

	return imageURLs, nil
}