"""
Main FastAPI application for Xenia - YouTube Comment Sentiment Analysis
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import time

from .models import (
    AnalysisRequest,
    AnalysisResponse,
    HealthResponse,
    SentimentDistribution,
    CommentWithSentiment
)
from .youtube_service import YouTubeService
from .sentiment_service import SentimentService

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Xenia API",
    description="AI-powered YouTube Comment Sentiment Analysis",
    version="1.0.0"
)

# Configure CORS (allow frontend to access API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services (loaded once at startup)
youtube_service = None
sentiment_service = None


@app.on_event("startup")
async def startup_event():
    """Initialize services when server starts"""
    global youtube_service, sentiment_service
    
    print("🚀 Starting Xenia API...")
    
    try:
        # Initialize YouTube service
        api_key = os.getenv("YOUTUBE_API_KEY")
        if not api_key:
            print("⚠️  WARNING: YouTube API key not found in .env file")
            print("   Add YOUTUBE_API_KEY to .env before making requests")
        else:
            youtube_service = YouTubeService(api_key)
            print("✅ YouTube service initialized")
        
        # Initialize sentiment analysis (this takes a moment)
        sentiment_service = SentimentService()
        print("✅ Sentiment service initialized")
        
        print("🎉 Xenia API is ready!")
        
    except Exception as e:
        print(f"❌ Startup error: {str(e)}")
        print("   Server will start but may not work properly")


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint - health check"""
    return {
        "status": "healthy",
        "message": "Xenia API is running! Use POST /analyze to analyze videos."
    }


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Detailed health check"""
    services_ready = youtube_service is not None and sentiment_service is not None
    
    return {
        "status": "healthy" if services_ready else "initializing",
        "message": "All services ready" if services_ready else "Services loading..."
    }


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_video(request: AnalysisRequest):
    """
    Analyze sentiment of YouTube video comments
    
    Args:
        request: Contains video_url and optional max_comments
    
    Returns:
        Sentiment analysis results with top positive/negative comments
    """
    start_time = time.time()
    
    # Check if services are initialized
    if not youtube_service or not sentiment_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Services are still initializing. Please wait a moment and try again."
        )
    
    try:
        # Step 1: Extract video ID from URL
        print(f"📝 Extracting video ID from: {request.video_url}")
        video_id = youtube_service.extract_video_id(request.video_url)
        print(f"✅ Video ID: {video_id}")
        
        # Step 2: Fetch comments from YouTube
        print(f"📥 Fetching up to {request.max_comments} comments...")
        comments = youtube_service.fetch_comments(video_id, request.max_comments)
        print(f"✅ Fetched {len(comments)} comments")
        
        if not comments:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No comments found. Video may have comments disabled or no comments yet."
            )
        
        # Step 3: Analyze sentiment
        print(f"🤖 Analyzing sentiment...")
        analysis_results = sentiment_service.analyze_comments(comments)
        print(f"✅ Analysis complete in {analysis_results['processing_time_seconds']}s")
        
        # Step 4: Format response
        response = AnalysisResponse(
            video_id=video_id,
            total_comments=analysis_results['total_comments'],
            sentiment_distribution=SentimentDistribution(
                positive=analysis_results['sentiment_distribution']['positive'],
                negative=analysis_results['sentiment_distribution']['negative'],
                neutral=analysis_results['sentiment_distribution']['neutral']
            ),
            top_positive_comments=[
                CommentWithSentiment(
                    text=c['text'],
                    sentiment=c['sentiment'],
                    confidence=c['confidence']
                )
                for c in analysis_results['top_positive_comments']
            ],
            top_negative_comments=[
                CommentWithSentiment(
                    text=c['text'],
                    sentiment=c['sentiment'],
                    confidence=c['confidence']
                )
                for c in analysis_results['top_negative_comments']
            ],
            processing_time_seconds=round(time.time() - start_time, 2)
        )
        
        print(f"🎉 Request completed in {response.processing_time_seconds}s")
        return response
        
    except ValueError as e:
        # Invalid URL
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # Any other error
        error_message = str(e)
        print(f"❌ Error: {error_message}")
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_message
        )


@app.get("/test")
async def test_endpoint():
    """Simple test endpoint to verify API is responding"""
    return {
        "message": "API is working!",
        "youtube_service_ready": youtube_service is not None,
        "sentiment_service_ready": sentiment_service is not None
    }


# For debugging: endpoint to test sentiment on custom text
@app.post("/test-sentiment")
async def test_sentiment(text: str):
    """Test sentiment analysis on custom text"""
    if not sentiment_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Sentiment service not ready"
        )
    
    result = sentiment_service.analyze_single_comment(text)
    return result