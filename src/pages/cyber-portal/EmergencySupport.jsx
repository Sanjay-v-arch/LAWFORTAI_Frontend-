import React, { useEffect, useState } from 'react';
import { PhoneCall, Copy, Check, ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';

const EmergencySupport = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/universal/emergency-helpline');
                setData(res);
            } catch (error) {
                console.error("Failed to fetch emergency data", error);
                // Fallback data if API fails (for demo/robustness)
                setData({
                    helpline: "1930",
                    message: "Call 1930 immediately — National Cyber Fraud Helpline",
                    regional: [
                        { state: "Delhi", number: "011-23456789" },
                        { state: "Maharashtra", number: "022-22620111" }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Portal
                </button>

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400"
                    >
                        <PhoneCall size={40} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Emergency Support</h1>
                    <p className="text-gray-600 dark:text-gray-300">Immediate assistance for cyber fraud and emergencies.</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Main Helpline Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-red-100 dark:border-red-900/30"
                        >
                            <div className="bg-red-500/10 p-8 text-center">
                                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">National Cyber Fraud Helpline</h2>
                                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight flex items-center justify-center gap-4">
                                    {data?.helpline}
                                    <button
                                        onClick={() => copyToClipboard(data?.helpline)}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                        title="Copy Number"
                                    >
                                        {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} className="text-gray-400" />}
                                    </button>
                                </div>
                                <a
                                    href={`tel:${data?.helpline}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 hover:-translate-y-1"
                                >
                                    <PhoneCall size={24} className="mr-2" /> Call Now
                                </a>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 text-center">
                                <p className="text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-2">
                                    <ShieldAlert size={20} className="text-orange-500" />
                                    {data?.message}
                                </p>
                            </div>
                        </motion.div>

                        {/* Regional Numbers (Mock/Future) */}
                        {data?.regional && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Regional Direct Lines</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.regional.map((region, index) => (
                                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{region.state}</span>
                                            <a href={`tel:${region.number}`} className="text-blue-600 font-bold hover:underline">{region.number}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmergencySupport;
