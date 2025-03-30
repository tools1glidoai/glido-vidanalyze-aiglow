# Stage 1: Build the React frontend
FROM node:18-alpine as frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Set up the Python backend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create directory for static files
RUN mkdir -p /app/static

# Copy the built frontend from the builder stage
COPY --from=frontend-builder /app/dist /app/static

# Copy the backend code
COPY src/lib/videoAnalysis.py ./

# Create directory for temporary files
RUN mkdir -p /app/temp

# Set environment variables
ENV PORT=8000
ENV HOST=0.0.0.0
ENV STATIC_FILES_DIR=/app/static

# Expose the port
EXPOSE 8000

# Start the application
CMD ["python", "videoAnalysis.py"] 