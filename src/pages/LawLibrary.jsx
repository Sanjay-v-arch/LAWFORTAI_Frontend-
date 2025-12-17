import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, BookOpen, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/categories';
import { laws } from '../data/laws';
import clsx from 'clsx';

const LawLibrary = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredLaws, setFilteredLaws] = useState(laws);

    // Magnetic Border Ref
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search');
        if (query) {
            setSearchTerm(query);
        }
    }, [location.search]);

    useEffect(() => {
        const results = laws.filter(law => {
            const matchesSearch =
                law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                law.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                law.simplified.toLowerCase().includes(searchTerm.toLowerCase()) ||
                law.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = selectedCategory ? law.category === selectedCategory : true;

            return matchesSearch && matchesCategory;
        });
        setFilteredLaws(results);
    }, [searchTerm, selectedCategory]);

    const handleMouseMove = (e) => {
        if (!searchContainerRef.current) return;
        const { left, top } = searchContainerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        searchContainerRef.current.style.setProperty('--x', `${x}px`);
        searchContainerRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cyber Law Library</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                        Browse through a comprehensive collection of acts, rules, and regulations simplified for you.
                    </p>

                    {/* Magnetic Search Bar */}
                    <div
                        ref={searchContainerRef}
                        onMouseMove={handleMouseMove}
                        className="relative max-w-2xl mx-auto group p-[2px] rounded-full overflow-hidden"
                        style={{ '--x': '50%', '--y': '50%' }}
                    >
                        <div
                            className="absolute inset-0 bg-gray-200 dark:bg-slate-700 transition-opacity duration-300"
                        />
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'radial-gradient(300px circle at var(--x) var(--y), #4f46e5, transparent 40%)'
                            }}
                        />
                        <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-full shadow-lg overflow-hidden border border-transparent">
                            <Search className="ml-6 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search laws, acts, sections..."
                                className="w-full px-4 py-4 bg-transparent outline-none text-slate-900 dark:text-white placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="p-2 mr-2 text-gray-400 hover:text-gray-600">
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col">
                    {/* Main Content - Laws List */}
                    <div className="w-full">
                        {/* Category Grid (Show only if no search and no category selected) */}
                        {!searchTerm && !selectedCategory && (
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Browse by Category</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {categories.map((cat) => (
                                        <motion.button
                                            key={cat.id}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedCategory(cat.title)}
                                            className={`relative p-6 rounded-2xl bg-white dark:bg-slate-800 text-left transition-all duration-300 group overflow-hidden
                                                shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]
                                                hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
                                                border border-gray-100 dark:border-slate-700
                                            `}
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-opacity group-hover:opacity-100" />
                                            <cat.icon size={32} className={`relative z-10 mb-4 ${cat.color} drop-shadow-sm`} />
                                            <p className="relative z-10 font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {cat.title}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Results Header */}
                        {(searchTerm || selectedCategory) && (
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {searchTerm ? `Results for "${searchTerm}"` : selectedCategory}
                                    </h2>
                                    {selectedCategory && !searchTerm && (
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className="text-sm text-blue-600 hover:underline mt-1 flex items-center gap-1"
                                        >
                                            <ChevronRight size={14} className="rotate-180" /> Back to Categories
                                        </button>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">{filteredLaws.length} found</span>
                            </div>
                        )}

                        {/* Law List - Only show if Search OR Category is active */}
                        {(searchTerm || selectedCategory) && (
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {filteredLaws.length > 0 ? (
                                        filteredLaws.map((law) => (
                                            <motion.div
                                                key={law.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                layout
                                                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                                                        {law.category}
                                                    </span>
                                                    <span className="text-sm text-gray-400">{law.year}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{law.title}</h3>
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="flex-1">
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 font-medium">Official Description</p>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{law.description}</p>
                                                    </div>
                                                    <div className="hidden md:block w-px bg-gray-200 dark:bg-slate-700"></div>
                                                    <div className="flex-1">
                                                        <p className="text-green-600 dark:text-green-400 text-sm mb-3 flex items-center gap-2 font-medium">
                                                            <BookOpen size={16} /> Simplified Explanation
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{law.simplified}"</p>
                                                    </div>
                                                </div>

                                                {law.tags.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-2">
                                                        {law.tags.map(tag => (
                                                            <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20">
                                            <p className="text-gray-500 text-lg">No laws found matching your criteria.</p>
                                            <button
                                                onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                                                className="mt-4 text-blue-600 hover:underline"
                                            >
                                                Clear all filters
                                            </button>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawLibrary;
