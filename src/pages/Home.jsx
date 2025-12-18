import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Book, Globe, ArrowRight, Gavel, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

import { useChat } from '../context/ChatContext';

const Home = () => {
    const { toggleChat, isOpen } = useChat(); // Added isOpen check optionally if needed to sync state, but toggle is enough
    const features = [
        {
            icon: Book,
            title: "Comprehensive Database",
            description: "Access a vast library of India's cyber laws, acts, and amendments in one place.",
            color: "bg-blue-100 text-blue-600",
            delay: 0.1
        },
        {
            icon: Shield,
            title: "Simplified Explanations",
            description: "Understand complex legal jargon with our easy-to-read simplified summaries.",
            color: "bg-green-100 text-green-600",
            delay: 0.2
        },
        {
            icon: Globe,
            title: "AI Assistant",
            description: "Get instant answers to your legal queries powered by our advanced AI chatbot.",
            color: "bg-purple-100 text-purple-600",
            delay: 0.3
        }
    ];

    const featuredLaws = [
        {
            title: "IT Act 2000",
            description: "The primary law in India dealing with cybercrime and electronic commerce.",
            category: "Cyber Crimes",
            link: "/laws?search=IT+Act+2000"
        },
        {
            title: "DPDP Act 2023",
            description: "India's new Digital Personal Data Protection Act safeguarding user privacy.",
            category: "Data Protection",
            link: "/laws?search=DPDP"
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                            Navigate the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Digital Legal World</span> with Confidence
                        </h1>
                        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
                            Access comprehensive cyber laws, simplified explanations, and expert AI assistance. Empowering citizens, police, and legal professionals.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/laws" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                Explore Laws
                                <ArrowRight className="ml-2 -mr-1" size={20} />
                            </Link>
                            <button
                                onClick={toggleChat}
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-slate-700 text-base font-medium rounded-full text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                                Ask Assistant
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: feature.delay }}
                                className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Regulations */}
            <section className="py-20 block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Regulations</h2>
                            <p className="text-slate-600 dark:text-slate-400">Stay updated with the most critical cyber laws.</p>
                        </div>
                        <Link to="/laws" className="hidden sm:flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            View all
                            <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {featuredLaws.map((law, index) => (
                            <motion.div
                                key={law.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col sm:flex-row items-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-4 rounded-xl bg-orange-100 text-orange-600 mb-4 sm:mb-0 sm:mr-6 shrink-0">
                                    <Gavel size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                                            {law.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{law.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{law.description}</p>
                                    <Link to={law.link} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                                        Read simplified version
                                        <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
