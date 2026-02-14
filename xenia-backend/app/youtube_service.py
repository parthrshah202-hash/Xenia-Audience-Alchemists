"""
YouTube Data API integration service
"""
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from typing import List, Optional
import re
import os


class YouTubeService:
    """Service for fetching YouTube comments"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize YouTube service with API key"""
        self.api_key = api_key or os.getenv("YOUTUBE_API_KEY")
        if not self.api_key:
            raise ValueError("YouTube API key not provided")
        
        self.youtube = build('youtube', 'v3', developerKey=self.api_key)
    
    def extract_video_id(self, url: str) -> str:
        """
        Extract video ID from various YouTube URL formats
        
        Supports:
        - https://www.youtube.com/watch?v=VIDEO_ID
        - https://youtu.be/VIDEO_ID
        - https://www.youtube.com/embed/VIDEO_ID
        """
        patterns = [
            r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})',
            r'v=([a-zA-Z0-9_-]{11})'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        
        raise ValueError(f"Invalid YouTube URL: {url}")
    
    def fetch_comments(self, video_id: str, max_results: int = 100) -> List[str]:
        """
        Fetch comments from a YouTube video
        
        Args:
            video_id: YouTube video ID
            max_results: Maximum number of comments to fetch (max 100 per request)
        
        Returns:
            List of comment texts
        """
        try:
            comments = []
            
            # First request
            request = self.youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=min(max_results, 100),
                textFormat="plainText",
                order="relevance"  # Get most relevant comments first
            )
            
            response = request.execute()
            
            # Extract comments from response
            for item in response['items']:
                comment_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
                # Filter out very short comments (likely spam or low quality)
                if len(comment_text.strip()) >= 10:
                    comments.append(comment_text)
            
            # If we need more comments and there's a next page
            while len(comments) < max_results and 'nextPageToken' in response:
                request = self.youtube.commentThreads().list(
                    part="snippet",
                    videoId=video_id,
                    maxResults=min(max_results - len(comments), 100),
                    pageToken=response['nextPageToken'],
                    textFormat="plainText",
                    order="relevance"
                )
                response = request.execute()
                
                for item in response['items']:
                    comment_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
                    if len(comment_text.strip()) >= 10:
                        comments.append(comment_text)
                        
                        if len(comments) >= max_results:
                            break
            
            return comments[:max_results]
        
        except HttpError as e:
            if e.resp.status == 403:
                raise Exception("YouTube API quota exceeded or comments disabled")
            elif e.resp.status == 404:
                raise Exception("Video not found")
            else:
                raise Exception(f"YouTube API error: {str(e)}")
        except Exception as e:
            raise Exception(f"Error fetching comments: {str(e)}")
    
    def get_video_info(self, video_id: str) -> dict:
        """
        Get basic video information (optional, for future use)
        
        Args:
            video_id: YouTube video ID
        
        Returns:
            Dictionary with video title, channel, view count, etc.
        """
        try:
            request = self.youtube.videos().list(
                part="snippet,statistics",
                id=video_id
            )
            response = request.execute()
            
            if not response['items']:
                raise Exception("Video not found")
            
            video = response['items'][0]
            return {
                'title': video['snippet']['title'],
                'channel': video['snippet']['channelTitle'],
                'views': video['statistics'].get('viewCount', 'N/A'),
                'likes': video['statistics'].get('likeCount', 'N/A'),
                'comments': video['statistics'].get('commentCount', 'N/A')
            }
        except Exception as e:
            # Return empty dict if fails (non-critical)
            return {}