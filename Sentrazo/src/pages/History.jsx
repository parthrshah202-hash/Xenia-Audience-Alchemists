import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const History = () => {
    // In a real app, integrate with state management or API
    const historyData = [
        { id: 1, title: "React vs Vue 2026", url: "https://youtu.be/...", date: "Oct 24, 2026", status: "Completed", sentiment: "positive" },
        { id: 2, title: "My setup tour", url: "https://youtu.be/...", date: "Oct 22, 2026", status: "Completed", sentiment: "neutral" },
        { id: 3, title: "Coding vlog #3", url: "https://youtu.be/...", date: "Oct 20, 2026", status: "Completed", sentiment: "positive" },
        { id: 4, title: "Q&A Special", url: "https://youtu.be/...", date: "Oct 15, 2026", status: "Completed", sentiment: "negative" },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Analysis History</h2>
                <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Video Title</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Sentiment</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-24">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {historyData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                                        <div className="text-xs text-gray-400 truncate max-w-[200px]">{item.url}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" /> {item.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            <CheckCircle className="w-3 h-3" /> {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${item.sentiment === 'positive' ? 'bg-green-500' :
                                                item.sentiment === 'neutral' ? 'bg-slate-400' : 'bg-red-500'
                                            }`}></span>
                                        <span className="capitalize text-sm">{item.sentiment}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
