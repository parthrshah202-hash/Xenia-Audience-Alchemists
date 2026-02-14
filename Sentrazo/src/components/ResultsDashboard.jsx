import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ResultsDashboard = ({ results, onReset }) => {
  const { 
    video_id, 
    total_comments, 
    sentiment_distribution,
    top_positive_comments,
    top_negative_comments,
    processing_time_seconds
  } = results;

  // Calculate percentages
  const positivePercent = Math.round((sentiment_distribution.positive / total_comments) * 100);
  const negativePercent = Math.round((sentiment_distribution.negative / total_comments) * 100);
  const neutralPercent = 100 - positivePercent - negativePercent;

  // Prepare data for pie chart
  const chartData = [
    { name: 'Positive', value: sentiment_distribution.positive, percent: positivePercent },
    { name: 'Negative', value: sentiment_distribution.negative, percent: negativePercent },
  ];

  const COLORS = {
    positive: '#10b981',
    negative: '#ef4444',
  };

  // Generate AI Summary
  const generateSummary = () => {
    const sentiment = positivePercent > 60 ? 'mostly loves' : positivePercent > 40 ? 'has mixed feelings about' : 'is critical of';
    
    // Extract themes from comments
    const positiveThemes = [];
    const negativeThemes = [];
    
    top_positive_comments.forEach(c => {
      const text = c.text.toLowerCase();
      if (text.includes('explain') || text.includes('clear')) positiveThemes.push('clear explanation');
      if (text.includes('edit')) positiveThemes.push('editing');
      if (text.includes('helpful') || text.includes('learn')) positiveThemes.push('educational value');
    });
    
    top_negative_comments.forEach(c => {
      const text = c.text.toLowerCase();
      if (text.includes('audio') || text.includes('sound')) negativeThemes.push('audio quality');
      if (text.includes('long') || text.includes('short')) negativeThemes.push('content length');
      if (text.includes('clickbait')) negativeThemes.push('misleading title');
    });
    
    const mainPraise = positiveThemes[0] || 'the content';
    const mainCriticism = negativeThemes[0] || 'certain aspects';
    
    return `The audience ${sentiment} the content, praising the ${mainPraise} and overall quality. However, there are some complaints about ${mainCriticism}.`;
  };

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  const displayPercent = ((value / total_comments) * 100).toFixed(2);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="font-bold text-sm"
    >
      {displayPercent}%
    </text>
  );
};


  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </button>
          <div className="text-sm text-gray-500">
            Video ID: {video_id}
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-[#1e2732] rounded-2xl p-8 mb-8 border border-gray-700/50">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl p-3 flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">AI Summary</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {generateSummary()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Comments */}
          <div className="bg-[#1e2732] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Comments</p>
                <p className="text-3xl font-bold">{total_comments.toLocaleString()}</p>
              </div>
              <div className="text-blue-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Positive */}
          <div className="bg-[#1e2732] rounded-2xl p-6 border border-gray-700/50 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Positive</p>
                <p className="text-3xl font-bold text-green-500">
                  {sentiment_distribution.positive}
                </p>
                <p className="text-sm text-gray-500 mt-1">{positivePercent}%</p>
              </div>
              <div className="text-5xl">😊</div>
            </div>
          </div>

          {/* Negative */}
          <div className="bg-[#1e2732] rounded-2xl p-6 border border-gray-700/50 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Negative</p>
                <p className="text-3xl font-bold text-red-500">
                  {sentiment_distribution.negative}
                </p>
                <p className="text-sm text-gray-500 mt-1">{negativePercent}%</p>
              </div>
              <div className="text-5xl">😞</div>
            </div>
          </div>

          {/* Processing Time */}
          <div className="bg-[#1e2732] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Analyzed In</p>
                <p className="text-3xl font-bold text-purple-500">{processing_time_seconds}s</p>
                <p className="text-sm text-gray-500 mt-1">DistilBERT AI</p>
              </div>
              <div className="text-5xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Sentiment Chart */}
        <div className="bg-[#1e2732] rounded-2xl p-8 mb-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6 text-center">Sentiment Distribution</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill={COLORS.positive} />
                  <Cell fill={COLORS.negative} />
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2732', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value, name) => [`${value} comments (${chartData.find(d => d.name === name)?.percent}%)`, name]}
                />
                <Legend 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comments Grid - Top Praise and Key Criticisms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Praise */}
          <div className="bg-[#1e2732] rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-green-500">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Top Praise</h2>
            </div>

            {top_positive_comments.length > 0 ? (
              <div className="space-y-4">
                {top_positive_comments.slice(0, 5).map((comment, index) => (
                  <div 
                    key={index}
                    className="bg-[#141a21] border border-gray-700/50 rounded-xl p-5 hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-green-500 text-lg">#{index + 1}</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                        {(comment.confidence * 100).toFixed(1)}% confident
                      </span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      "{comment.text}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No positive comments found</p>
            )}
          </div>

          {/* Key Criticisms */}
          <div className="bg-[#1e2732] rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-red-500">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Key Criticisms</h2>
            </div>

            {top_negative_comments.length > 0 ? (
              <div className="space-y-4">
                {top_negative_comments.slice(0, 5).map((comment, index) => (
                  <div 
                    key={index}
                    className="bg-[#141a21] border border-gray-700/50 rounded-xl p-5 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-red-500 text-lg">#{index + 1}</span>
                      <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-semibold">
                        {(comment.confidence * 100).toFixed(1)}% confident
                      </span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      "{comment.text}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No negative comments found</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by DistilBERT AI • Analyzed {total_comments} comments in {processing_time_seconds} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;