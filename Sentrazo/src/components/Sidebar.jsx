import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, History, Sparkles, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: Search, label: 'Analyze', path: '/analyze' },
        { icon: History, label: 'History', path: '/history' },
        { icon: Sparkles, label: 'Pro Insights', path: '/pro-insights' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-screen flex flex-col fixed left-0 top-0 transition-all z-20">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <img src="/logo.png" alt="Sentrazo" className="w-40 h-auto object-contain" />
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
            `}
                    >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white mb-4 shadow-lg shadow-indigo-500/20">
                    <h4 className="font-semibold text-sm mb-1">Sentrazo Pro</h4>
                    <p className="text-xs text-indigo-100 mb-3">Unlock advanced AI analysis</p>
                    <button className="w-full bg-white/20 hover:bg-white/30 text-xs font-semibold py-1.5 rounded-lg transition-colors">
                        Upgrade @ ₹400/mo
                    </button>
                </div>

                <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl w-full transition-colors text-sm font-medium">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
