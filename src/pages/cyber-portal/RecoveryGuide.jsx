import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, ArrowLeft, DollarSign, Facebook, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';

const RecoveryGuide = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/universal/recovery-steps');
                setData(res);
            } catch (error) {
                console.error("Failed to fetch recovery data", error);
                // Fallback / Mock Data
                setData({
                    title: "Cyber Incident Recovery Guide",
                    description: "Follow these critical steps immediately after a cyber incident to secure your assets.",
                    sections: [
                        {
                            title: "Financial Security",
                            icon: "DollarSign",
                            steps: [
                                "Call 1930 to report the fraud immediately.",
                                "Freeze your bank accounts and credit cards.",
                                "Change banking passwords and PINs."
                            ]
                        },
                        {
                            title: "Social Media & Email",
                            icon: "Facebook",
                            steps: [
                                "Log out of all active sessions.",
                                "Enable Two-Factor Authentication (2FA).",
                                "Check for unauthorized connected devices."
                            ]
                        },
                        {
                            title: "Digital Identity",
                            icon: "Key",
                            steps: [
                                "Scan your device for malware.",
                                "Change passwords for all critical accounts.",
                                "Alert your contacts about potential impersonation."
                            ]
                        }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'DollarSign': return <DollarSign size={24} className="text-green-600" />;
            case 'Facebook': return <Facebook size={24} className="text-blue-600" />;
            case 'Key': return <Key size={24} className="text-yellow-600" />;
            default: return <Activity size={24} className="text-blue-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
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
                        className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400"
                    >
                        <Activity size={32} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{data?.title || "Recovery Guide"}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{data?.description || "Loading recovery steps..."}</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.sections?.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                                        {getIcon(section.icon)}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {section.steps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecoveryGuide;
