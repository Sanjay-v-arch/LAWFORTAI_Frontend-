import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, MessageSquare, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { useChat } from '../../context/ChatContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { toggleChat } = useChat();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Browse Laws', path: '/laws' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300">
                            <Shield size={24} fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            LawFort
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                                    location.pathname === link.path ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Cyber Chat Button */}
                        <button
                            onClick={toggleChat}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <MessageSquare size={16} />
                            <span className="hidden lg:inline">Cyber Chat</span>
                        </button>

                        {/* Profile Link */}
                        <Link to="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <User size={20} className="text-gray-600 dark:text-gray-300" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                            >
                                Profile
                            </Link>
                            <div className="pt-4">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        toggleChat();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md">
                                    <MessageSquare size={18} />
                                    Cyber Chat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
