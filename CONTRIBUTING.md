# Contributing to CvArdi BI

First off, thank you for considering contributing to CvArdi BI! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by a code of mutual respect. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if applicable**
* **Include your environment details** (OS, Python version, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any alternative solutions you've considered**

### Pull Requests

* Fill in the required template
* Follow the code style of the project (see below)
* Include appropriate test cases
* Update documentation as needed
* End all files with a newline

## Development Setup

### Backend Development

```bash
cd backend
conda env create -f environment.yml
conda activate cvardi
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Mobile App Development

```bash
cd app
npm install
npx expo start
```

## Code Style Guidelines

### Python (Backend)

* Follow [PEP 8](https://pep8.org/) style guide
* Use meaningful variable and function names
* Add docstrings to functions and classes
* Keep functions small and focused

Example:
```python
def process_image(image_path: str, user_id: str) -> dict:
    """
    Process an image for a specific user.
    
    Args:
        image_path: Path to the image file
        user_id: Unique identifier for the user
        
    Returns:
        Dictionary containing processing results
    """
    # Implementation
    pass
```

### JavaScript/TypeScript (Frontend & Mobile)

* Use TypeScript when possible
* Follow existing code formatting (Prettier is configured)
* Use meaningful variable and function names
* Write JSDoc comments for complex functions
* Prefer functional components with hooks

Example:
```typescript
/**
 * Upload user selfie to the server
 * @param file - The image file to upload
 * @param userId - Unique user identifier
 * @returns Promise with upload result
 */
async function uploadSelfie(file: File, userId: string): Promise<UploadResult> {
  // Implementation
}
```

## Commit Message Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that don't affect code meaning (formatting, etc.)
* **refactor**: Code change that neither fixes a bug nor adds a feature
* **perf**: Performance improvements
* **test**: Adding or correcting tests
* **chore**: Changes to build process or auxiliary tools

### Examples
```bash
feat(backend): add gesture detection endpoint
fix(frontend): resolve image upload timeout issue
docs: update installation instructions
refactor(mobile): simplify camera component logic
```

## Project Structure

When adding new features, follow the existing structure:

```
backend/
  ├── app.py              # Main Flask app - add new endpoints here
  ├── helpers.py          # Utility functions
  └── models/             # ML models (if adding new ones)

frontend/
  ├── pages/              # Next.js pages
  ├── components/         # Reusable React components
  └── lib/                # Utility functions

app/
  ├── app/                # Expo Router pages
  └── components/         # React Native components
```

## Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
npm run lint
```

## Documentation

* Update README.md if you change functionality
* Add JSDoc/docstrings to new functions
* Update architecture diagrams if needed
* Include usage examples for new features

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.

## Recognition

Contributors will be recognized in the project documentation. Thank you for your contributions!
