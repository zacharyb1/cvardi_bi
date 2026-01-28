# 📁 CvArdi BI - Project Structure

This document explains the organization of the CvArdi BI repository.

## Repository Overview

```
cvardi_bi/
│
├── 📱 app/                      # React Native mobile application (Expo)
├── 🖥️  backend/                 # Python Flask API and ML models
├── 🌐 frontend/                # Next.js web application
├── 🔬 opencv/                  # OpenCV experiments and notebooks
├── 📚 docs/                    # Documentation (NEW)
├── 🖼️  assets/                  # Project assets (NEW)
├── 📄 README.md                # Main project documentation (NEW)
├── ⚖️  LICENSE                  # MIT License (NEW)
├── 🤝 CONTRIBUTING.md          # Contributing guidelines (NEW)
└── 🚫 .gitignore               # Git ignore rules (NEW)
```

---

## 📱 Mobile App (`/app`)

React Native application built with Expo framework.

```
app/
├── app/                        # Expo Router pages (file-based routing)
│   ├── (tabs)/                # Tab navigation screens
│   │   ├── index.tsx          # Home tab
│   │   └── two.tsx            # Secondary tab
│   ├── modal.tsx              # Modal screens
│   └── _layout.tsx            # Root layout
│
├── components/                 # Reusable React Native components
│   ├── Themed.tsx             # Themed components (Text, View, etc.)
│   ├── EditScreenInfo.tsx     # Info display component
│   └── StyledText.tsx         # Custom text component
│
├── constants/                  # App constants
│   └── Colors.ts              # Color theme definitions
│
├── hooks/                      # Custom React hooks
│   └── useColorScheme.ts      # Theme detection hook
│
├── assets/                     # Static assets
│   ├── images/                # Images (splash, icon, etc.)
│   └── fonts/                 # Custom fonts
│
├── app.json                   # Expo configuration
├── package.json               # Node dependencies
├── tsconfig.json              # TypeScript config
└── babel.config.js            # Babel configuration
```

### Key Technologies
- **Expo 50**: Managed React Native workflow
- **TypeScript**: Type-safe code
- **Expo Router**: File-based navigation
- **Nativewind**: Tailwind CSS for React Native
- **Expo Camera**: Native camera integration

---

## 🖥️  Backend (`/backend`)

Python Flask API with machine learning models for face recognition.

```
backend/
├── app.py                     # Main Flask application (REST API)
├── server.py                  # WebSocket server (real-time streaming)
├── helpers.py                 # Utility functions (face recognition, image processing)
├── rmbg.py                    # Background removal functionality
│
├── static/                    # Static file storage
│   ├── userSelfies/          # User uploaded selfies (userId.png)
│   │   └── .gitkeep          # Preserve directory structure
│   └── editedImages/         # Processed/edited images
│       └── .gitkeep          # Preserve directory structure
│
├── notebooks/                 # Jupyter notebooks (experimental)
│   ├── face_recognition.ipynb # Face recognition experiments
│   ├── pose_detection.ipynb   # Pose detection experiments
│   └── gesture_detection.ipynb # Gesture recognition experiments
│
├── environment.yml            # Conda environment specification
└── requirements.txt           # Pip dependencies (if not using Conda)
```

### Key Files

#### `app.py` - Main API Server
```python
Endpoints:
├── GET  /                    # Health check
├── GET  /images              # Get all images
├── GET  /images?userId={id}  # Get images for specific user
└── POST /user                # Upload user selfie
```

#### `helpers.py` - Core Utilities
```python
Functions:
├── save_image_to_folder()    # Save uploaded images
├── face_recognition()        # Match faces using InsightFace
└── label_images()           # Label/categorize images
```

#### `server.py` - WebSocket Server
- Real-time image streaming
- Live gesture detection
- Continuous face tracking

### Key Technologies
- **Flask**: Web framework
- **PyTorch 2.2.2**: Deep learning
- **InsightFace**: Face recognition models
- **OpenCV**: Image processing
- **PIL/Pillow**: Image manipulation

---

## 🌐 Frontend (`/frontend`)

Next.js web application with React 18 and TypeScript.

```
frontend/
├── pages/                     # Next.js pages (file-based routing)
│   ├── index.tsx             # Home page
│   ├── upload.tsx            # Upload page
│   ├── gallery.tsx           # Image gallery
│   ├── _app.tsx              # Custom App component
│   └── api/                  # API routes (serverless functions)
│
├── components/                # React components
│   ├── Header.tsx            # Header component
│   ├── ImageUpload.tsx       # Upload component
│   ├── Gallery.tsx           # Gallery component
│   └── Layout.tsx            # Layout wrapper
│
├── lib/                       # Utility libraries
│   ├── api.ts                # API client functions
│   └── utils.ts              # Helper functions
│
├── public/                    # Static assets
│   ├── images/               # Public images
│   ├── favicon.ico           # Favicon
│   └── vercel.svg            # Vercel logo
│
├── styles/                    # Global styles
│   ├── globals.css           # Global CSS
│   └── Home.module.css       # Module CSS
│
├── package.json               # Node dependencies
├── tsconfig.json             # TypeScript config
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
└── postcss.config.js         # PostCSS config
```

### Key Technologies
- **Next.js**: React framework with SSR
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **Axios**: HTTP client

---

## 🔬 OpenCV (`/opencv`)

Computer vision experiments and utility notebooks.

```
opencv/
├── pose_detection.ipynb       # Pose detection experiments
├── gesture_recognition.ipynb  # Gesture detection experiments
├── face_detection.ipynb       # Face detection experiments
└── utils/                     # Utility scripts
```

### Purpose
- Experimentation with CV algorithms
- Prototyping new features
- Testing different models
- Performance benchmarking

---

## 📚 Documentation (`/docs`) - NEW

Comprehensive project documentation.

```
docs/
├── ARCHITECTURE.md            # System architecture details
├── QUICKSTART.md             # Quick start guide (5 min setup)
├── SCREENSHOTS_GUIDE.md      # Guide for adding screenshots/GIFs
│
└── images/                    # Documentation images
    ├── README.md             # Image guidelines
    ├── screenshots/          # Application screenshots
    │   ├── .gitkeep          # Preserve directory
    │   ├── main-interface.png     # (to be added)
    │   ├── upload-selfie.png      # (to be added)
    │   └── results-gallery.png    # (to be added)
    │
    ├── demos/                # GIF demonstrations
    │   ├── .gitkeep          # Preserve directory
    │   └── full-workflow.gif      # (to be added)
    │
    └── architecture/         # Architecture diagrams
        ├── .gitkeep          # Preserve directory
        ├── system-diagram.png     # (to be added)
        └── data-flow.png          # (to be added)
```

---

## 🖼️  Assets (`/assets`) - NEW

Project-wide assets (not specific to frontend/mobile).

```
assets/
├── screenshots/               # Repository screenshots (for GitHub)
│   └── .gitkeep              # Preserve directory
│
├── logos/                    # Project logos
└── branding/                 # Branding materials
```

---

## 📄 Root Level Files

### Documentation Files

- **`README.md`** - Main project documentation
  - Project overview and features
  - Tech stack
  - Installation instructions
  - Usage guide
  - Architecture overview
  
- **`LICENSE`** - MIT License
  - Open source license
  - Grants usage, modification, and distribution rights
  
- **`CONTRIBUTING.md`** - Contributing guidelines
  - How to contribute
  - Code style guidelines
  - Commit message conventions
  - Development workflow

### Configuration Files

- **`.gitignore`** - Git ignore rules
  - Python artifacts (`__pycache__`, `*.pyc`)
  - Node modules (`node_modules/`)
  - Environment files (`.env`)
  - Build outputs (`dist/`, `.next/`)
  - IDE files (`.vscode/`, `.idea/`)
  - Large image files in static folders

- **`.DS_Store`** - macOS metadata (should be in .gitignore)

---

## 🎯 Best Practices

### Directory Structure Guidelines

1. **Keep related files together**: Components, tests, and styles should live near each other
2. **Use clear naming**: Folders should have descriptive names (e.g., `components/` not `comp/`)
3. **Separate concerns**: Frontend, backend, and mobile code in separate directories
4. **Document structure**: Keep this file updated as the structure evolves
5. **Use .gitkeep**: Preserve empty directories in version control

### File Naming Conventions

#### Backend (Python)
- Snake case: `face_recognition.py`, `image_processor.py`
- Notebooks: `pose_detection.ipynb`

#### Frontend/Mobile (JavaScript/TypeScript)
- PascalCase for components: `ImageUpload.tsx`, `Gallery.tsx`
- camelCase for utilities: `apiClient.ts`, `utils.ts`
- kebab-case for pages (Next.js): `upload-page.tsx`

### Adding New Features

When adding a new feature:

1. **Backend**: Add to `backend/` and update `helpers.py` or create new module
2. **API**: Add endpoints to `app.py` or create new Flask blueprint
3. **Frontend**: Add component to `frontend/components/` or page to `pages/`
4. **Mobile**: Add screen to `app/app/` using Expo Router conventions
5. **Documentation**: Update relevant docs in `docs/`
6. **Tests**: Add tests in same directory as feature (create `__tests__/` or `.test.ts`)

---

## 🔄 Typical Development Workflow

```
1. Create feature branch
   ├── git checkout -b feature/new-feature
   │
2. Make changes in appropriate directory
   ├── backend/ (API changes)
   ├── frontend/ (Web UI changes)
   └── app/ (Mobile changes)
   │
3. Test locally
   ├── Run backend: python app.py
   ├── Run frontend: npm run dev
   └── Run mobile: npx expo start
   │
4. Update documentation
   ├── Update README.md if needed
   ├── Add to ARCHITECTURE.md if architectural change
   └── Add screenshots if UI change
   │
5. Commit with conventional commits
   └── git commit -m "feat: add new feature"
   │
6. Push and create PR
   └── git push origin feature/new-feature
```

---

## 🚀 Future Structure Considerations

As the project grows, consider:

### Backend
- `backend/models/` - Separate model definitions
- `backend/services/` - Business logic layer
- `backend/tests/` - Comprehensive test suite
- `backend/migrations/` - Database migrations (when DB added)

### Frontend
- `frontend/contexts/` - React contexts
- `frontend/hooks/` - Custom hooks
- `frontend/tests/` - Frontend tests
- `frontend/types/` - TypeScript type definitions

### Shared
- `/shared/` or `/common/` - Shared types/utilities between frontend and backend
- `/docs/api/` - API documentation (Swagger/OpenAPI)
- `/scripts/` - Build and deployment scripts
- `/tests/integration/` - Integration tests

---

## 📊 Current Repository Stats

```
Lines of Code: ~5,000+
Number of Files: ~50+
Languages: Python, TypeScript/JavaScript
Total Size: ~500MB (with models)
Contributors: 1+
```

---

## 🛠️  Maintenance

This document should be updated when:
- ✅ New directories are added
- ✅ File structure significantly changes
- ✅ New major features are added
- ✅ Technology stack changes

**Last Updated**: 2026-01-28
