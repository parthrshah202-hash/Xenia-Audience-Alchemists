import React, { useState } from 'react';
import { Video, MessageSquare, TrendingUp, ArrowRight, Search, Zap, Clock, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (url) {
            navigate(`/analyze?url=${encodeURIComponent(url)}`);
        }
    };

    const stats = [
        { label: 'Videos Analyzed', value: '12', change: '+2', changeType: 'positive', icon: Video, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Comments Processed', value: '45.2k', change: '+12%', changeType: 'positive', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Avg Sentiment', value: '78%', change: '-1.5%', changeType: 'negative', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    ];

    const chartData = [
        { name: 'Mon', comments: 1200 },
        { name: 'Tue', comments: 1900 },
        { name: 'Wed', comments: 1500 },
        { name: 'Thu', comments: 2800 },
        { name: 'Fri', comments: 2400 },
        { name: 'Sat', comments: 3100 },
        { name: 'Sun', comments: 3800 },
    ];

    const recentActivity = [
        { title: "How to Code in 2026", date: "2 hours ago", sentiment: "Positive", comments: 1240, thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=100&h=100&fit=crop" },
        { title: "My honest review of X", date: "Yesterday", sentiment: "Mixed", comments: 850, thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop" },
        { title: "Vlog #45 - Tokyo", date: "2 days ago", sentiment: "Positive", comments: 2100, thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&h=100&fit=crop" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Quick Action */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        Overview
                    </h2>
                    <p className="text-gray-500 mt-2">Welcome back, Aakash. Here's your channel pulse.</p>
                </div>
                <div className="w-full md:w-auto">
                    <form onSubmit={handleAnalyze} className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Paste YouTube URL to analyze..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
                        <button type="submit" className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-transform hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <h4 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h4>
                            </div>
                        </div>
                        <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.changeType === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart: Activity Trend */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            <h3 className="font-semibold text-lg">Engagement Trends</h3>
                        </div>
                        <select className="text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-1">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                                />
                                <Area type="monotone" dataKey="comments" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorComments)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Recent + Pro */}
                <div className="space-y-6">
                    {/* Recent Analysis List */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" /> Recent
                            </h3>
                            <Link to="/history" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</Link>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer group">
                                    <img src={item.thumbnail} alt="thumbnail" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                            <span>{item.date}</span>
                                            <span>•</span>
                                            <span className={`${item.sentiment === 'Positive' ? 'text-green-600' : 'text-yellow-600'}`}>{item.sentiment}</span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600">
                                        {item.comments > 1000 ? (item.comments / 1000).toFixed(1) + 'k' : item.comments}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Banner */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-bold text-sm uppercase tracking-wide text-yellow-400">Pro Feature</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Unlock Deep Insights</h3>
                            <p className="text-gray-300 text-sm mb-4">Get AI personas, advanced timelines, and brand safety scores.</p>
                            <button className="w-full bg-white text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
