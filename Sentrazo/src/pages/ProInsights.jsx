import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell, ReferenceLine } from 'recharts';
import { ShieldAlert, Lightbulb, TrendingUp, Users } from 'lucide-react';

const ProInsights = () => {
    // Mock Data for Pro Features
    const sentimentTimelineData = [
        { time: '00:00', sentiment: 60 }, { time: '02:00', sentiment: 65 },
        { time: '04:00', sentiment: 75 }, { time: '06:00', sentiment: 40 }, // Negative spike
        { time: '08:00', sentiment: 55 }, { time: '10:00', sentiment: 80 },
        { time: '12:00', sentiment: 85 },
    ];

    const topicData = [
        { x: 10, y: 30, z: 200, name: 'Editing', fill: '#8884d8' },
        { x: 30, y: 200, z: 100, name: 'Audio', fill: '#82ca9d' },
        { x: 45, y: 100, z: 400, name: 'Content', fill: '#ffc658' },
        { x: 50, y: 40, z: 150, name: 'Pacing', fill: '#ff8042' },
        { x: 70, y: 150, z: 120, name: 'Camera', fill: '#0088fe' },
    ];

    const goldenQuestions = [
        { user: "TechFan99", text: "Can you explain how the useEffect hook dependency array actually works under the hood?", likes: 452 },
        { user: "ReactNewbie", text: "What's the best way to handle global state without Redux in 2026?", likes: 312 },
        { user: "DevGuru", text: "Is it worth migrating from Next.js 15 to 16 for a small project?", likes: 128 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Pro Insights
                    </h2>
                    <p className="text-gray-500 mt-2">Deep dive analysis powered by advanced AI models.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        Beta
                    </span>
                </div>
            </div>

            {/* Row 1: Timeline & Brand Safety */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        <div>
                            <h3 className="font-semibold text-lg">Sentiment Timeline</h3>
                            <p className="text-xs text-gray-400">Real-time emotional tracking throughout the video</p>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sentimentTimelineData}>
                                <defs>
                                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#EF4444" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis domain={[0, 100]} hide />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            const score = payload[0].value;
                                            const sentiment = score > 60 ? 'Positive' : score < 40 ? 'Negative' : 'Neutral';
                                            const color = score > 60 ? 'text-green-600' : score < 40 ? 'text-red-600' : 'text-gray-600';
                                            return (
                                                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                                                    <p className={`text-sm font-bold ${color}`}>
                                                        {sentiment} ({score}%)
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <ReferenceLine y={50} label="Neutral" stroke="#9CA3AF" strokeDasharray="3 3" />
                                <Area type="monotone" dataKey="sentiment" stroke="#8884d8" fill="url(#splitColor)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <ShieldAlert className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">98/100</h3>
                    <p className="text-gray-500 font-medium mb-4">Brand Safety Score</p>
                    <p className="text-sm text-gray-400">
                        This comment section is <span className="text-green-500 font-bold">Safe</span> for advertisers. Low toxicity detected.
                    </p>
                </div>
            </div>

            {/* Row 2: Topics & Golden Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5 text-blue-500" />
                        <div>
                            <h3 className="font-semibold text-lg">Topic Galaxy</h3>
                            <p className="text-xs text-gray-400">Key discussion themes by volume and relevance</p>
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis type="number" dataKey="x" name="Relevance" hide />
                                <YAxis type="number" dataKey="y" name="Volume" hide />
                                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Impact" />
                                <Tooltip
                                    cursor={{ strokeDasharray: '3 3' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1" style={{ color: data.fill }}>{data.name}</p>
                                                    <div className="text-xs text-gray-500 space-y-1">
                                                        <p>Volume: <span className="font-medium text-gray-700 dark:text-gray-300">{data.y}</span></p>
                                                        <p>Relevance: <span className="font-medium text-gray-700 dark:text-gray-300">{data.x}%</span></p>
                                                        <p>Impact Score: <span className="font-medium text-gray-700 dark:text-gray-300">{data.z}</span></p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Scatter name="Topics" data={topicData} fill="#8884d8">
                                    {topicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2 mb-4">Bubble size indicates impact score</p>

                    <div className="space-y-3 mt-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b pb-2 border-gray-100 dark:border-gray-800">Topic Breakdown</h4>
                        {topicData.map((topic, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: topic.fill }}></div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">{topic.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {topic.y} comments • {topic.x}% relevance
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/20">
                    <div className="flex items-center gap-2 mb-6">
                        <Lightbulb className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold text-lg text-yellow-900 dark:text-yellow-100">Golden Questions</h3>
                    </div>
                    <div className="space-y-4">
                        {goldenQuestions.map((q, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                                <p className="text-gray-800 dark:text-gray-200 font-medium text-sm mb-2">"{q.text}"</p>
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>Asked by <span className="font-bold">{q.user}</span></span>
                                    <span className="flex items-center gap-1">👍 {q.likes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProInsights;
