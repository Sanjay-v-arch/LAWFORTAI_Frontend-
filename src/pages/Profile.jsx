import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, BookOpen, Award, Settings, Camera, LogOut, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();

    // Mock data for demonstration if no user is logged in
    const mockUser = {
        name: "Aditya Sharma",
        email: "aditya.sharma@example.com",
        role: "Citizen",
        avatar: null,
        stats: {
            lawsRead: 12,
            savedItems: 5,
            testsTaken: 3
        }
    };

    const [activeUser, setActiveUser] = useState(user || mockUser);

    useEffect(() => {
        if (user) setActiveUser(user);
        // If no user actually logged in via AuthContext, we use mockUser for display
        // In a real app, we might redirect to login here
    }, [user]);

    const getRoleTheme = (role) => {
        switch (role?.toLowerCase()) {
            case 'police':
                return {
                    badge: 'bg-blue-100 text-blue-700'
                };
            case 'legal':
                return {
                    badge: 'bg-purple-100 text-purple-700'
                };
            default: // Citizen
                return {
                    badge: 'bg-orange-100 text-orange-700'
                };
        }
    };

    const theme = getRoleTheme(activeUser.role);

    const handleRoleSwitch = (newRole) => {
        const updated = { ...activeUser, role: newRole };
        setActiveUser(updated);

        if (user) {
            updateUser({ role: newRole });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 pt-0">
            {/* Full Width Banner */}
            <div className="h-64 md:h-80 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 animate-gradient-x"></div>
                {/* Decorative shapes similar to About */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl"></div>
                </div>
                <button className="absolute top-24 right-8 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-20">
                    <Settings size={24} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start -mt-20 mb-8 gap-8">
                    {/* Avatar */}
                    <div className="relative group shrink-0">
                        <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white dark:border-slate-900 bg-white dark:bg-slate-800 flex items-center justify-center shadow-2xl overflow-hidden`}>
                            {activeUser.avatar ? (
                                <img src={activeUser.avatar} alt={activeUser.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={80} className="text-gray-400" />
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 hover:scale-100">
                            <Camera size={20} />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-24 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">{activeUser.name}</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">{activeUser.email}</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <span className={`px-4 py-2 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm ${theme.badge}`}>
                                <Shield size={18} /> {activeUser.role} Account
                            </span>
                            {activeUser.role === 'Legal' && (
                                <span className="px-4 py-2 rounded-full text-base font-semibold bg-green-100 text-green-700 flex items-center gap-2 shadow-sm">
                                    <CheckCircle size={18} /> Verified Bar Council ID
                                </span>
                            )}
                            {activeUser.role === 'Police' && (
                                <span className="px-4 py-2 rounded-full text-base font-semibold bg-blue-100 text-blue-700 flex items-center gap-2 shadow-sm">
                                    <CheckCircle size={18} /> Verified Police ID
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="md:pt-24 w-full md:w-auto flex justify-center">
                        <button onClick={handleLogout} className="px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-all shadow-sm hover:shadow-md">
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Stats & Activity - Now Full Width */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Activity Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                        <BookOpen size={32} />
                                    </div>
                                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{activeUser.stats?.lawsRead || 0}</h3>
                                    <p className="text-gray-500 font-medium">Laws Read</p>
                                </div>
                                <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 bg-yellow-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-yellow-600 mb-4">
                                        <Award size={32} />
                                    </div>
                                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{activeUser.stats?.savedItems || 0}</h3>
                                    <p className="text-gray-500 font-medium">Saved Items</p>
                                </div>
                                <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 bg-green-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                        <Shield size={32} />
                                    </div>
                                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{activeUser.stats?.testsTaken || 0}</h3>
                                    <p className="text-gray-500 font-medium">Knowledge Tests</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Dummy */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                            <BookOpen size={18} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">Read "IT Act Section 66A"</p>
                                            <p className="text-sm text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
