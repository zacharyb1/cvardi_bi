# 📸 CvArdi BI - Intelligent Image Recognition & Processing Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-latest-black)
![React Native](https://img.shields.io/badge/React_Native-0.73.6-61DAFB?logo=react)
![PyTorch](https://img.shields.io/badge/PyTorch-2.2.2-EE4C2C?logo=pytorch)
![Flask](https://img.shields.io/badge/Flask-latest-000000?logo=flask)

**Transform your images with AI-powered face recognition, gesture detection, and intelligent image processing**

[🚀 Live Demo](#) | [📖 Documentation](#installation) | [🐛 Report Bug](https://github.com/zacharyb1/cvardi_bi/issues)

</div>

---

## 🎯 What is CvArdi BI?

**CvArdi BI** is a cutting-edge image processing platform that uses advanced computer vision and machine learning to recognize faces, detect gestures, and intelligently edit images. Upload a selfie, and watch as the system finds you in a collection of images, applying personalized edits based on pose detection and background analysis.

> **Perfect for:** Event photographers, social media applications, automated photo organization, and AI-powered image editing workflows.

---

## ✨ Key Features

- 🎭 **Face Recognition**: Advanced face matching using InsightFace models
- 👋 **Gesture Detection**: Real-time gesture recognition from image streams
- 🖼️ **Smart Image Processing**: Automated background removal and intelligent editing
- 🌐 **Multi-Platform**: Web application (Next.js) and mobile app (React Native/Expo)
- ⚡ **Real-Time Streaming**: WebSocket-based image streaming for live processing
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS and Framer Motion

---

## 📸 Screenshots & Demo

<!-- TODO: Add screenshots here -->
> **Coming Soon**: Screenshots and GIF walkthroughs of the application in action

### Main Interface
```
📷 Upload your selfie → 🔍 AI finds you in photos → ✨ Get personalized edits
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
├───────────────────┬─────────────────────────────────────────┤
│   Web Frontend    │         Mobile App                      │
│   (Next.js)       │      (React Native/Expo)                │
│   - React 18      │      - Expo 50                          │
│   - TypeScript    │      - Camera Integration               │
│   - TailwindCSS   │      - Nativewind                       │
└─────────┬─────────┴──────────────┬──────────────────────────┘
          │                        │
          │    HTTP/REST API       │
          │    WebSocket Stream    │
          │                        │
┌─────────▼────────────────────────▼──────────────────────────┐
│                   BACKEND LAYER                              │
├──────────────────────────────────────────────────────────────┤
│                  Flask API Server                            │
│   • RESTful endpoints (app.py)                               │
│   • WebSocket server (server.py)                             │
│   • CORS enabled for cross-origin requests                   │
└─────────┬────────────────────────────────────────────────────┘
          │
          │  ML Processing Pipeline
          │
┌─────────▼────────────────────────────────────────────────────┐
│              AI/ML PROCESSING LAYER                          │
├──────────────────────────────────────────────────────────────┤
│  Face Recognition    │  Image Processing   │  Gesture Detect │
│  - InsightFace       │  - OpenCV           │  - MediaPipe    │
│  - PyTorch Models    │  - Background Removal│  - Pose Detect  │
│  - helpers.py        │  - rmbg.py          │  - Real-time    │
└─────────┬────────────────────────────────────────────────────┘
          │
┌─────────▼────────────────────────────────────────────────────┐
│                  STORAGE LAYER                               │
├──────────────────────────────────────────────────────────────┤
│  File System Storage                                         │
│  • static/userSelfies/     - User uploaded selfies           │
│  • static/editedImages/    - Processed output images         │
│  • Cloudinary Integration  - Cloud image management          │
└──────────────────────────────────────────────────────────────┘

External Services:
├─ Cloudinary: Image hosting and CDN
└─ GitHub: Source control and CI/CD
```

### Data Flow
1. **User uploads selfie** → Stored in `userSelfies/` folder
2. **Face embedding generated** → InsightFace creates feature vector
3. **Image collection scanned** → Each image checked for face match
4. **Matching images identified** → Filtered based on similarity threshold
5. **Processing applied** → Background removal, pose-based edits
6. **Results returned** → Edited images delivered to client

---

## 🗄️ Data Schema

### Storage Structure
```
static/
├── userSelfies/
│   └── {userId}.png          # User selfie with userId as filename
│
└── editedImages/
    └── {imageId}.png         # Processed images available for matching
```

### API Data Models

#### User Object
```json
{
  "id": "string (unique identifier)",
  "imageUrl": "string (path to selfie)",
  "timestamp": "datetime (upload time)"
}
```

#### Image Response
```json
{
  "imageUrls": [
    "http://server/static/editedImages/image1.png",
    "http://server/static/editedImages/image2.png"
  ]
}
```

#### Face Recognition Flow
```
Selfie Image → InsightFace Embedding (512-dim vector) → 
Compare with Gallery Images → Similarity Score → 
Threshold Filter → Return Matches
```

---

## 🛠️ Tech Stack

### Frontend (Web)
- **Framework**: Next.js (latest) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion (animations)
- **UI Components**: HeadlessUI, Heroicons
- **State Management**: react-hooks-global-state
- **Image Handling**: Cloudinary, imagemin

### Mobile App
- **Framework**: Expo 50
- **Runtime**: React Native 0.73.6
- **Styling**: Nativewind (Tailwind for React Native)
- **Camera**: Expo Camera & Image Picker
- **Navigation**: Expo Router

### Backend
- **Framework**: Flask (Python)
- **ML/AI**: 
  - PyTorch 2.2.2 + TorchVision
  - InsightFace (face recognition)
  - OpenCV (cv2) - Image processing
  - MediaPipe - Gesture detection
- **Image Processing**: PIL/Pillow, rembg (background removal)
- **WebSocket**: Real-time streaming support
- **CORS**: flask-cors for cross-origin requests

### DevOps & Tools
- **Environment Management**: Conda (environment.yml)
- **GPU Support**: CUDA 12.1 (optional, for acceleration)
- **Development**: Jupyter Notebooks (experimentation)
- **Package Management**: npm (frontend), pip/conda (backend)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### For Backend Development:
- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Conda** (recommended) or pip for package management
- **CUDA Toolkit 12.1** (optional, for GPU acceleration)
- **Git** for version control

### For Frontend Development:
- **Node.js 16+** and npm ([Download](https://nodejs.org/))
- **Git** for version control

### For Mobile App Development:
- **Node.js 16+** and npm
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** (for emulator)

---

## 🚀 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/zacharyb1/cvardi_bi.git
cd cvardi_bi
```

### 2️⃣ Backend Setup

#### Option A: Using Conda (Recommended)
```bash
cd backend

# Create conda environment from environment.yml
conda env create -f environment.yml

# Activate the environment
conda activate cvardi

# Verify installation
python --version  # Should show Python 3.11+
```

#### Option B: Using pip
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121  # CUDA 12.1
pip install flask flask-cors insightface opencv-python pillow rembg
```

#### Create Required Directories
```bash
mkdir -p static/userSelfies
mkdir -p static/editedImages
```

### 3️⃣ Frontend Setup (Web)
```bash
cd frontend

# Install dependencies
npm install

# Or using yarn
yarn install
```

### 4️⃣ Mobile App Setup
```bash
cd app

# Install dependencies
npm install

# Or using yarn
yarn install
```

---

## 🎮 Usage

### Running the Backend (Flask API)
```bash
cd backend
conda activate cvardi  # If using conda

# Start the Flask server
python app.py

# The API will be available at http://localhost:5000
```

#### Backend Endpoints:
- `GET /` - Health check
- `GET /images?userId={id}` - Get images containing the user
- `POST /user` - Upload user selfie (multipart/form-data)

### Running the Frontend (Web)
```bash
cd frontend

# Development mode
npm run dev

# The web app will be available at http://localhost:3000
```

### Running the Mobile App
```bash
cd app

# Start Expo development server
npx expo start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Or scan QR code with Expo Go app on your phone
```

---

## 📂 Project Structure

```
cvardi_bi/
│
├── backend/                    # Python Flask API & ML models
│   ├── app.py                  # Main Flask application with REST endpoints
│   ├── server.py               # WebSocket server for real-time streaming
│   ├── helpers.py              # Face recognition and image processing utilities
│   ├── rmbg.py                 # Background removal functionality
│   ├── environment.yml         # Conda environment configuration
│   ├── static/                 # Static file storage
│   │   ├── userSelfies/        # Uploaded user selfies
│   │   └── editedImages/       # Processed/edited images
│   └── *.ipynb                 # Jupyter notebooks for experimentation
│
├── frontend/                   # Next.js web application
│   ├── pages/                  # Next.js pages and routing
│   ├── components/             # React components
│   ├── public/                 # Static assets
│   ├── styles/                 # Global styles
│   ├── package.json            # Node dependencies
│   └── tsconfig.json           # TypeScript configuration
│
├── app/                        # React Native mobile application
│   ├── app/                    # Expo Router pages
│   ├── components/             # React Native components
│   ├── assets/                 # Images, fonts, etc.
│   ├── package.json            # Node dependencies
│   └── app.json                # Expo configuration
│
└── opencv/                     # OpenCV utilities and notebooks
    └── *.ipynb                 # Computer vision experiments
```

---

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Test the API is running
curl http://localhost:5000/

# Test image retrieval
curl http://localhost:5000/images
```

### Frontend Testing
```bash
cd frontend

# Run linting
npm run lint

# Build for production
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Zachary B** - [@zacharyb1](https://github.com/zacharyb1)

---

## 🙏 Acknowledgments

- [InsightFace](https://github.com/deepinsight/insightface) - Face recognition models
- [OpenCV](https://opencv.org/) - Computer vision library
- [PyTorch](https://pytorch.org/) - Deep learning framework
- [Next.js](https://nextjs.org/) - React framework
- [Expo](https://expo.dev/) - React Native framework

---

## 📞 Support

- 📧 Email: [Create an issue](https://github.com/zacharyb1/cvardi_bi/issues)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/zacharyb1/cvardi_bi/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/zacharyb1/cvardi_bi/discussions)

---

<div align="center">

Made with ❤️ by the CvArdi Team

⭐ Star this repo if you find it useful!

</div>
