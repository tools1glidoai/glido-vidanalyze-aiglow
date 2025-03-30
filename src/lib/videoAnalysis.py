import google.generativeai as genai
import time
import os
import json
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDigx8Ds0ehc1aCggjx_7h3Nbmug6QL39Q")
genai.configure(api_key=GEMINI_API_KEY)

# Configure the model
generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Ensure temp directory exists
os.makedirs("temp", exist_ok=True)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/api/analyze-video")
async def analyze_video(
    file: UploadFile = File(...),
    analysis_request: str = Form(None)
):
    try:
        # Parse the analysis request JSON if provided
        prompt = "Analyze the video for storytelling, hook effectiveness, and transitions."
        if analysis_request:
            try:
                request_data = json.loads(analysis_request)
                if request_data.get('prompt'):
                    prompt = request_data['prompt']
            except json.JSONDecodeError:
                pass

        # Save the uploaded file temporarily
        temp_file_path = os.path.join("temp", f"temp_{file.filename}")
        with open(temp_file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # Initialize the model
        model = genai.GenerativeModel(
            model_name='gemini-2.0-flash',
            generation_config=generation_config,
            safety_settings=safety_settings
        )

        # Read the video file for processing
        with open(temp_file_path, "rb") as video_file:
            video_data = video_file.read()

        # Generate analysis
        response = model.generate_content(
            contents=[
                prompt,
                {"mime_type": "video/mp4", "data": video_data}
            ]
        )

        # Clean up temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

        if response.text:
            return {"status": "success", "analysis": response.text}
        else:
            return {"status": "error", "message": "No analysis generated"}

    except Exception as e:
        # Clean up temp file in case of error
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port) 
