# Video Analysis with Gemini AI

This project combines a React frontend with a FastAPI backend to analyze videos using Google's Gemini AI. Upload videos and get AI-powered analysis of storytelling, hook effectiveness, and transitions.

## Features

- Video upload and analysis
- Custom prompt support
- Real-time processing feedback
- Modern React frontend with TypeScript
- FastAPI backend for efficient processing
- Docker support for easy deployment

## Prerequisites

- Node.js 18 or higher
- Python 3.11 or higher
- Docker and Docker Compose (optional)
- Google Gemini API key

## Environment Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your-api-key-here
```

## Development

### Using Docker (Recommended)

1. Start the development environment:
```bash
docker-compose up
```

2. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

### Manual Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend:
```bash
python src/lib/videoAnalysis.py
```

4. Start the frontend development server:
```bash
npm run dev
```

## Production Deployment

1. Build and run using Docker:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

2. Access the application at http://localhost:8000

## Project Structure

```
.
├── src/
│   ├── components/    # React components
│   ├── lib/          # Backend Python code
│   └── pages/        # React pages
├── public/           # Static assets
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── requirements.txt  # Python dependencies
```

## API Endpoints

- `POST /api/analyze-video`: Upload and analyze video
- `GET /health`: Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
