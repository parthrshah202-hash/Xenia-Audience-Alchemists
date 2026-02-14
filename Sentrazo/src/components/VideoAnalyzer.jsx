import { useState } from 'react';
import { analyzeVideo } from '../services/api';
import ResultsDashboard from './ResultsDashboard';

const VideoAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [maxComments, setMaxComments] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    if (maxComments < 10 || maxComments > 500) {
      setError('Please enter a number between 10 and 500');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeVideo(videoUrl, maxComments);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoUrl('');
    setMaxComments(100);
    setResults(null);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAnalyze();
    }
  };

  if (results) {
    return <ResultsDashboard results={results} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Sentrazo
          </h1>
          <p className="text-xl text-gray-400">
            Transform audience chatter into clear intelligence.
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="https://youtu.be/hey3cxT3JpY"
              disabled={loading}
              className="w-full bg-[#1e2732] text-white px-6 py-4 pr-12 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg placeholder:text-gray-500"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Comments + Button */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-end mb-10">
          
          {/* Comment Count */}
          <div>
            <label htmlFor="maxComments" className="block text-sm text-gray-400 mb-2">
              Comments to analyze
            </label>

            <input
              id="maxComments"
              type="number"
              min="10"
              max="500"
              value={maxComments}
              onChange={(e) => setMaxComments(parseInt(e.target.value) || 10)}
              disabled={loading}
              className="w-full bg-[#1e2732] text-white px-4 py-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
            />

            <p className="text-xs text-gray-500 mt-1">10-500 comments</p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing {maxComments} comments...
              </span>
            ) : (
              `Analyze ${maxComments} Comments`
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Info Text */}
        {!loading && !error && (
          <div className="text-center text-gray-500 text-sm">
            <p>Paste a YouTube URL above to analyze comments with AI-powered sentiment analysis</p>
            <p className="mt-2 text-xs text-gray-600">
              💡 Tip: Use 50-100 comments for faster results, 200-500 for comprehensive analysis
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default VideoAnalyzer;
