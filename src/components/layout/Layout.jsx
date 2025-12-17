import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Chatbot from '../features/Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Chatbot />
            <Footer />
        </div>
    );
};

export default Layout;
