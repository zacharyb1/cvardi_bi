import cv2 as cv

# Specify the path to the video file
video_path = 'C:/Users/zach/Downloads/gb.mp4'  # Update the path accordingly

# Start capturing video from the local file
capture = cv.VideoCapture(video_path)

# Load a pre-trained Haar Cascade model for face detection
face_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')
# Load a pre-trained Haar Cascade model for full body detection
body_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_fullbody.xml')

while True:
    # Read a new frame
    ret, frame = capture.read()
    if not ret:
        print("Failed to grab frame")
        break
    
    # Convert the frame to grayscale
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    # Detect faces in the frame
    #faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv.CASCADE_SCALE_IMAGE)

    # Detect people in the frame
    bodies = body_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    
    # Draw rectangles around the bodies
    for (x, y, w, h) in bodies:
        cv.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)


    # Draw rectangles around the faces
    #for (x, y, w, h) in faces:
        #cv.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

      # Display the number of people detected
    cv.putText(frame, f'People: {len(bodies)}', (10, 20), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    # Display the resulting frame
    cv.imshow('Video', frame)

    if cv.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
capture.release()
cv.destroyAllWindows()
