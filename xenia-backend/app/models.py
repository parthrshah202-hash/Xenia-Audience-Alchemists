"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, HttpUrl, Field
from typing import List, Dict


class AnalysisRequest(BaseModel):
    """Request model for video analysis"""
    video_url: str = Field(..., description="YouTube video URL")
    max_comments: int = Field(default=100, ge=10, le=500, description="Maximum comments to analyze")


class SentimentDistribution(BaseModel):
    """Sentiment breakdown"""
    positive: int
    negative: int
    neutral: int = 0  # For future expansion


class CommentWithSentiment(BaseModel):
    """Individual comment with sentiment score"""
    text: str
    sentiment: str  # 'POSITIVE' or 'NEGATIVE'
    confidence: float


class AnalysisResponse(BaseModel):
    """Response model for analysis results"""
    video_id: str
    total_comments: int
    sentiment_distribution: SentimentDistribution
    top_positive_comments: List[CommentWithSentiment]
    top_negative_comments: List[CommentWithSentiment]
    processing_time_seconds: float


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    message: str