import React, { useState } from 'react';
import GenericPieChart from './GenericPieChart';
import { ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle, ShieldCheck, Zap, Brain, Sparkles, ChevronDown, ChevronUp, Lock } from 'lucide-react';

const Dashboard = ({ data }) => {
    const [summaryMode, setSummaryMode] = useState('short'); // 'short' or 'detailed'
    const [showAllReplies, setShowAllReplies] = useState(false);
    const isPro = false; // Toggle this to test Pro features

    if (!data) return null;

    // Prepare data for charts
    const sentimentData = [
        { name: 'Positive', value: data.sentiment.positive, color: '#22c55e' },
        { name: 'Neutral', value: data.sentiment.neutral, color: '#94a3b8' },
        { name: 'Negative', value: data.sentiment.negative, color: '#ef4444' },
    ];

    const intentData = [
        { name: 'Questions', value: data.userIntent.questions, color: '#3b82f6' },
        { name: 'Praise', value: data.userIntent.praise, color: '#8b5cf6' },
        { name: 'Complaints', value: data.userIntent.complaints, color: '#f59e0b' },
        { name: 'Discussion', value: data.userIntent.discussion, color: '#10b981' },
        { name: 'Spam', value: data.userIntent.spam, color: '#6b7280' },
    ];

    const engagementData = [
        { name: 'Fan', value: data.engagement.fan, color: '#ec4899' },
        { name: 'Casual', value: data.engagement.casual, color: '#6366f1' },
        { name: 'Debate', value: data.engagement.hries, color: '#f97316' }, // High-risk/High-reward
        { name: 'Churn', value: data.engagement.churn, color: '#9ca3af' },
    ];

    // AI Replies Logic
    const freeRepliesLimit = 2; // Reduced for demo visibility
    const visibleReplies = isPro ? data.aiReplies : data.aiReplies.slice(0, freeRepliesLimit);

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between col-span-1">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Comments</p>
                        <h3 className="text-3xl font-bold mt-1">{data.totalComments.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                {/* Toxicity / Safety Score */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-3 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className={`p-4 rounded-full ${data.toxicity.score > 80 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Safety Score</p>
                            <h3 className="text-3xl font-bold">{data.toxicity.score}/100</h3>
                        </div>
                    </div>

                    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(data.toxicity.breakdown).map(([key, value]) => (
                            key !== 'safe' && (
                                <div key={key} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${value > 0 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${value > 0 ? value * 10 : 100}%` }} // Fabricated scaling for visual
                                        ></div>
                                    </div>
                                    <p className="text-xs font-bold mt-1 text-right">{value}%</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" /> Sentiment
                    </h3>
                    <GenericPieChart data={sentimentData} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-500" /> User Intent
                    </h3>
                    <GenericPieChart data={intentData} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" /> Engagement
                    </h3>
                    <GenericPieChart data={engagementData} />
                </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 border-b border-blue-100 dark:border-gray-600 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">AI Executive Summary</h3>
                    </div>
                    <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => setSummaryMode('short')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${summaryMode === 'short' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Concise
                        </button>
                        <button
                            onClick={() => setSummaryMode('detailed')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${summaryMode === 'detailed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Detailed
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className={`prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed transition-opacity duration-300 ${summaryMode === 'detailed' ? 'text-sm' : 'text-base'}`}>
                        {summaryMode === 'short' ? (
                            <p>{data.summary.short}</p>
                        ) : (
                            data.summary.detailed.split('\n\n').map((para, i) => (
                                <p key={i} className="mb-4 last:mb-0">{para}</p>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* AI Suggested Replies */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-indigo-500" />
                        Smart Replies <span className="text-xs font-normal text-gray-400 ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">Beta</span>
                    </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {visibleReplies.map((item) => (
                        <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {item.user[0]}
                                    </div>
                                    <span className="font-medium text-sm text-gray-900 dark:text-white">{item.user}</span>
                                </div>
                                {item.isPremium && !isPro && (
                                    <span className="text-xs flex items-center gap-1 text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full font-medium">
                                        <Lock className="w-3 h-3" /> Pro
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm mb-4 pl-10 border-l-2 border-gray-200 dark:border-gray-700 italic">
                                "{item.text}"
                            </p>

                            {(!item.isPremium || isPro) ? (
                                <div className="pl-10">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 relative group-hover:shadow-md transition-shadow cursor-pointer">
                                        <p className="text-indigo-800 dark:text-indigo-200 text-sm font-medium">{item.reply || "No reply generated (toxic/spam)"}</p>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-xs bg-white dark:bg-gray-800 text-indigo-600 px-2 py-1 rounded shadow-sm border border-indigo-100">
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="pl-10">
                                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                        <p className="text-gray-500 text-sm">Upgrade to Pro to unlock this smart reply</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {!isPro && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-sm text-gray-500 mb-2">You've reached your free limit of AI replies.</p>
                        <button className="text-indigo-600 font-semibold text-sm hover:underline">Upgrade to Pro for 100+ replies</button>
                    </div>
                )}
            </div>

            {/* Deep Dive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Positive Vibes */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <ThumbsUp className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold text-lg">Top Praise</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {data.topPositive.map((comment, i) => (
                            <div key={i} className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl text-green-900 dark:text-green-100 text-sm">
                                "{comment}"
                            </div>
                        ))}
                    </div>
                </div>

                {/* Critical Feedback */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-lg">Key Criticisms</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {data.topNegative.map((comment, i) => (
                            <div key={i} className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl text-red-900 dark:text-red-100 text-sm">
                                "{comment}"
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
