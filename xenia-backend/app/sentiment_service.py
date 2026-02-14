"""
Sentiment analysis service using HuggingFace transformers
"""
from transformers import pipeline
from typing import List, Dict, Tuple
import time


class SentimentService:
    """Service for analyzing comment sentiment using AI"""
    
    def __init__(self):
        """Initialize sentiment analysis pipeline"""
        print("Loading sentiment analysis model...")
        
        # Using DistilBERT - fast and accurate for sentiment analysis
        # Model is downloaded on first run and cached for future use
        self.sentiment_pipeline = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english",
            device=-1  # Use CPU (set to 0 for GPU if available)
        )
        
        print("Model loaded successfully!")
    
    def analyze_comments(self, comments: List[str]) -> Dict:
        """
        Analyze sentiment of a list of comments
        
        Args:
            comments: List of comment texts
        
        Returns:
            Dictionary with sentiment distribution and top comments
        """
        start_time = time.time()
        
        if not comments:
            return self._empty_result()
        
        # Truncate very long comments (model has 512 token limit)
        truncated_comments = [comment[:500] for comment in comments]
        
        # Batch process for efficiency
        results = self.sentiment_pipeline(truncated_comments, batch_size=8)
        
        # Combine comments with their sentiment results
        analyzed_comments = []
        for comment, result in zip(comments, results):
            analyzed_comments.append({
                'text': comment,
                'sentiment': result['label'],
                'confidence': result['score']
            })
        
        # Calculate distribution
        positive_count = sum(1 for r in results if r['label'] == 'POSITIVE')
        negative_count = sum(1 for r in results if r['label'] == 'NEGATIVE')
        
        # Get top positive and negative comments (sorted by confidence)
        positive_comments = [c for c in analyzed_comments if c['sentiment'] == 'POSITIVE']
        negative_comments = [c for c in analyzed_comments if c['sentiment'] == 'NEGATIVE']
        
        positive_comments.sort(key=lambda x: x['confidence'], reverse=True)
        negative_comments.sort(key=lambda x: x['confidence'], reverse=True)
        
        processing_time = time.time() - start_time
        
        return {
            'total_comments': len(comments),
            'sentiment_distribution': {
                'positive': positive_count,
                'negative': negative_count,
                'neutral': 0  # DistilBERT doesn't have neutral, but keep for future
            },
            'top_positive_comments': positive_comments[:5],
            'top_negative_comments': negative_comments[:5],
            'processing_time_seconds': round(processing_time, 2)
        }
    
    def _empty_result(self) -> Dict:
        """Return empty result structure"""
        return {
            'total_comments': 0,
            'sentiment_distribution': {
                'positive': 0,
                'negative': 0,
                'neutral': 0
            },
            'top_positive_comments': [],
            'top_negative_comments': [],
            'processing_time_seconds': 0.0
        }
    
    def analyze_single_comment(self, comment: str) -> Dict:
        """
        Analyze a single comment (useful for testing)
        
        Args:
            comment: Comment text
        
        Returns:
            Sentiment result with label and confidence
        """
        result = self.sentiment_pipeline(comment[:500])[0]
        return {
            'text': comment,
            'sentiment': result['label'],
            'confidence': result['score']
        }