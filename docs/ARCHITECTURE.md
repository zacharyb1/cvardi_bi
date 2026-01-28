# CvArdi BI - System Architecture Documentation

This document provides detailed technical documentation of the CvArdi BI system architecture.

## Table of Contents
1. [High-Level Architecture](#high-level-architecture)
2. [Component Details](#component-details)
3. [Data Flow](#data-flow)
4. [API Specifications](#api-specifications)
5. [Technology Decisions](#technology-decisions)

---

## High-Level Architecture

CvArdi BI follows a **three-tier architecture** pattern:

```
┌──────────────────────────────────────────────────────────────┐
│                     PRESENTATION TIER                         │
│  ┌────────────────────┐          ┌─────────────────────┐     │
│  │   Web Frontend     │          │    Mobile App       │     │
│  │   (Next.js/React)  │          │  (React Native)     │     │
│  └────────────────────┘          └─────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
                           │
                  HTTP/REST + WebSocket
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                      APPLICATION TIER                         │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Flask REST API Server                   │    │
│  │  • User management endpoints                         │    │
│  │  • Image upload/retrieval                            │    │
│  │  • Face recognition processing                       │    │
│  │  • WebSocket streaming                               │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
                           │
                 Python Function Calls
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                      DATA/ML TIER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ File Storage │  │  ML Models   │  │   OpenCV     │       │
│  │   (Static)   │  │ (InsightFace)│  │  Processing  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Presentation Tier

#### Web Frontend (Next.js)
- **Purpose**: Browser-based user interface for image upload and viewing
- **Key Technologies**:
  - Next.js (SSR/SSG capabilities)
  - React 18 (component framework)
  - TypeScript (type safety)
  - Tailwind CSS (styling)
  - Framer Motion (animations)

**Key Features**:
- Responsive design for mobile and desktop
- Image upload with drag-and-drop
- Gallery view of processed images
- Real-time status updates

#### Mobile App (React Native/Expo)
- **Purpose**: Native mobile experience with camera integration
- **Key Technologies**:
  - Expo 50 (React Native framework)
  - Expo Camera (native camera access)
  - Nativewind (Tailwind for RN)

**Key Features**:
- Native camera integration
- Photo gallery access
- Push notifications (future)
- Offline capability (future)

### 2. Application Tier

#### Flask REST API (`app.py`)
- **Purpose**: Main application server and business logic
- **Port**: 5000 (default)
- **CORS**: Enabled for cross-origin requests

**Endpoints**:
```python
GET  /                    # Health check
GET  /images?userId={id}  # Retrieve images for user
POST /user                # Create user and upload selfie
```

**Request Flow**:
1. Client sends HTTP request
2. Flask routes to appropriate handler
3. Handler calls helper functions
4. Response returned to client

#### WebSocket Server (`server.py`)
- **Purpose**: Real-time image streaming for live processing
- **Use Cases**:
  - Live gesture detection
  - Real-time face tracking
  - Progressive image processing updates

### 3. Data/ML Tier

#### Face Recognition Module (`helpers.py`)
```python
Key Functions:
- save_image_to_folder(image, folder_path, user_id)
- face_recognition(user_image, target_image) → bool
- label_images(directory_path) → list
```

**Face Recognition Pipeline**:
1. Load user selfie
2. Extract face embedding using InsightFace
3. Compare with target image embeddings
4. Calculate similarity score
5. Return match if score > threshold

**Model**: InsightFace (ArcFace backbone)
- **Input**: RGB image (any size)
- **Output**: 512-dimensional embedding vector
- **Similarity Metric**: Cosine similarity

#### Image Processing (`rmbg.py`)
- **Purpose**: Background removal and image editing
- **Technology**: rembg library (U2-Net model)
- **Process**:
  1. Load image
  2. Detect foreground/background
  3. Generate alpha mask
  4. Save processed image

#### File Storage
```
static/
├── userSelfies/
│   └── {userId}.png       # Original selfies
│
└── editedImages/
    └── {imageId}.png      # Processed images
```

**Storage Strategy**: Local file system
- Simple and fast for MVP
- Future: Migrate to cloud storage (S3/Cloudinary)

---

## Data Flow

### User Registration Flow
```
1. User captures/uploads selfie
   │
2. Frontend sends POST to /user
   ├─ Form data: { id, name, image }
   │
3. Backend receives request
   ├─ Validates image format
   ├─ Generates unique user_id
   │
4. Save image as {user_id}.png
   │
5. Extract face embedding
   ├─ InsightFace model processes image
   ├─ Generates 512-dim vector
   │
6. Store embedding (currently in-memory)
   │
7. Return success response
   └─ { userId, imageUrl }
```

### Image Retrieval Flow
```
1. User requests images
   │
2. GET /images?userId={id}
   │
3. Backend loads user's selfie
   │
4. Load all edited images
   │
5. For each edited image:
   ├─ Extract face embeddings
   ├─ Compare with user embedding
   ├─ Calculate similarity score
   │
6. Filter images (score > threshold)
   │
7. Return matched images
   └─ { imageUrls: [...] }
```

### Real-Time Streaming Flow (WebSocket)
```
1. Client opens WebSocket connection
   │
2. Client streams video frames
   │
3. Server receives frame
   ├─ Detect faces
   ├─ Recognize gestures
   ├─ Apply real-time processing
   │
4. Server sends processed frame back
   │
5. Client displays result
   │
6. Loop continues until disconnection
```

---

## API Specifications

### POST /user
Create a new user with selfie upload.

**Request**:
```http
POST /user HTTP/1.1
Content-Type: multipart/form-data

id: "user123"
name: "John Doe"
image: <binary file data>
```

**Response**:
```json
{
  "userId": "user123",
  "imageUrl": "http://server/static/userSelfies/user123.png",
  "status": "success"
}
```

**Error Responses**:
- `400`: No image provided
- `400`: No image selected
- `400`: Missing required fields

### GET /images
Retrieve all images or images containing a specific user.

**Request (All Images)**:
```http
GET /images HTTP/1.1
```

**Response**:
```json
{
  "imageUrls": [
    "http://server/static/editedImages/img1.png",
    "http://server/static/editedImages/img2.png"
  ]
}
```

**Request (User-Specific)**:
```http
GET /images?userId=user123 HTTP/1.1
```

**Response**:
```json
{
  "imageUrls": [
    "http://server/static/editedImages/img5.png"
  ]
}
```

---

## Technology Decisions

### Why Flask?
- **Pros**: Lightweight, Python-native, easy ML integration
- **Cons**: Not async by default (using WebSocket for real-time)
- **Alternative Considered**: FastAPI (async), Django (too heavy)

### Why InsightFace?
- **Pros**: State-of-art accuracy, pre-trained models, fast inference
- **Cons**: Requires PyTorch/ONNX runtime
- **Alternative Considered**: OpenCV Cascade (less accurate), dlib (slower)

### Why Next.js?
- **Pros**: SSR for SEO, great DX, React ecosystem
- **Cons**: Overkill for simple SPA
- **Alternative Considered**: Create React App (simpler), Vite (faster builds)

### Why Expo?
- **Pros**: Easy setup, managed workflow, OTA updates
- **Cons**: Larger bundle size, some native limitations
- **Alternative Considered**: React Native CLI (more control, harder setup)

---

## Performance Considerations

### Face Recognition Optimization
- **Caching**: Cache user embeddings to avoid recomputation
- **Batch Processing**: Process multiple images in parallel
- **GPU Acceleration**: Use CUDA for faster inference
- **Model Quantization**: Reduce model size for mobile deployment

### Image Storage
- **Current**: Local file system
- **Scaling Plan**:
  1. Add image compression
  2. Implement CDN (Cloudinary)
  3. Add caching layer (Redis)
  4. Consider object storage (S3)

### API Response Time
- **Target**: < 2 seconds for image matching
- **Bottlenecks**: 
  - Face detection (100-300ms per image)
  - Embedding comparison (10-50ms per comparison)
  - File I/O (50-200ms)

---

## Security Considerations

### Current Implementation
- CORS enabled for development
- No authentication/authorization
- Images stored without encryption
- Public static file serving

### Production Recommendations
1. **Authentication**: Implement JWT or OAuth2
2. **Authorization**: Role-based access control
3. **HTTPS**: Enforce TLS for all communications
4. **Input Validation**: Sanitize all user inputs
5. **Rate Limiting**: Prevent API abuse
6. **Image Validation**: Verify file types and sizes
7. **Secure Storage**: Encrypt sensitive images

---

## Future Enhancements

1. **Database Integration**: PostgreSQL for user data
2. **Async Processing**: Celery for background jobs
3. **Caching Layer**: Redis for embeddings and results
4. **Monitoring**: Prometheus + Grafana
5. **Logging**: Centralized logging with ELK stack
6. **CI/CD**: GitHub Actions for automated testing
7. **Containerization**: Docker + Kubernetes
8. **API Documentation**: Swagger/OpenAPI specs

---

## Development Workflow

```
Local Development → Git Commit → Push to GitHub → 
CI/CD Pipeline → Build & Test → Deploy to Staging → 
Manual Verification → Deploy to Production
```

### Recommended Tools
- **Version Control**: Git + GitHub
- **Code Review**: Pull Requests
- **Testing**: pytest (backend), Jest (frontend)
- **Linting**: flake8 (Python), ESLint (JS/TS)
- **Formatting**: Black (Python), Prettier (JS/TS)

---

## Troubleshooting

### Common Issues

**Issue**: Face recognition not working
- **Solution**: Check InsightFace model is downloaded
- **Check**: Verify image format (PNG/JPG)
- **Debug**: Print embedding shapes

**Issue**: CORS errors in browser
- **Solution**: Verify flask-cors is installed
- **Check**: Backend CORS(app) is called
- **Debug**: Check browser console for specific error

**Issue**: Slow image processing
- **Solution**: Enable GPU acceleration
- **Check**: CUDA is installed and detected
- **Debug**: Use `torch.cuda.is_available()`

---

## Contact & Support

For architecture questions or technical discussions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments in source files

---

*Last Updated: 2026-01-28*
*Version: 1.0*
