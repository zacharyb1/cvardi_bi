# 🚀 Quick Start Guide

Get CvArdi BI up and running in 5 minutes!

## Prerequisites Check

Before starting, verify you have:
- [ ] Python 3.11+ installed (`python --version`)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] Git installed (`git --version`)

## Step 1: Clone and Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/zacharyb1/cvardi_bi.git
cd cvardi_bi

# Backend setup
cd backend
conda env create -f environment.yml  # Or use pip (see README)
conda activate cvardi

# Create required directories
mkdir -p static/userSelfies static/editedImages

# Return to root
cd ..
```

## Step 2: Start Backend (1 minute)

```bash
cd backend
conda activate cvardi
python app.py
```

✅ **Verify**: Visit http://localhost:5000 - you should see "Hello, World🙌!"

## Step 3: Start Frontend (2 minutes)

**In a new terminal:**

```bash
cd cvardi_bi/frontend
npm install
npm run dev
```

✅ **Verify**: Visit http://localhost:3000 - you should see the web interface

## Step 4: Test the App

1. **Upload a selfie** through the web interface
2. **View processed images** in the gallery
3. **Check the API** at http://localhost:5000/images

## Optional: Mobile App

```bash
cd cvardi_bi/app
npm install
npx expo start

# Scan QR code with Expo Go app on your phone
```

## Troubleshooting

### Backend won't start?
```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install flask flask-cors insightface opencv-python pillow
```

### Frontend won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Face recognition not working?
- Check that `static/userSelfies/` and `static/editedImages/` exist
- Verify images are in PNG or JPG format
- Ensure InsightFace models are downloaded (happens automatically on first run)

## Next Steps

- 📖 Read the full [README.md](../README.md)
- 🏗️ Review the [Architecture Documentation](ARCHITECTURE.md)
- 🤝 Check [Contributing Guidelines](../CONTRIBUTING.md)

## Need Help?

- 🐛 [Report an Issue](https://github.com/zacharyb1/cvardi_bi/issues)
- 💬 [Start a Discussion](https://github.com/zacharyb1/cvardi_bi/discussions)

Happy coding! 🎉
