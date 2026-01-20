import React, { useEffect, useState } from 'react';
import { Shield, ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Lock, Users, Briefcase, Heart, Globe, BookOpen, ExternalLink, Smartphone, CreditCard, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';

const SECTION_CONFIG = {
    trending_scams: { title: "Trending Scams", icon: AlertTriangle, color: "text-red-500" },
    red_flags: { title: "Red Flags to Identify Fraud", icon: AlertTriangle, color: "text-orange-500" },
    safe_banking_practices: { title: "Safe Banking Practices", icon: CreditCard, color: "text-green-600" },
    phishing_detection_guide: { title: "Phishing Detection Guide", icon: Shield, color: "text-blue-500" },
    online_shopping_scam_patterns: { title: "Online Shopping Scam Patterns", icon: ShoppingCart, color: "text-purple-500" },
    social_engineering_tactics: { title: "Social Engineering Tactics", icon: Users, color: "text-indigo-500" },
    corporate_cyber_risks: { title: "Corporate Cyber Risks", icon: Briefcase, color: "text-gray-600" },
    student_cyber_threats: { title: "Student Cyber Threats", icon: BookOpen, color: "text-teal-500" },
    child_safety_guidelines: { title: "Child Safety Guidelines", icon: Heart, color: "text-pink-500" },
    privacy_protection_steps: { title: "Privacy Protection Steps", icon: Lock, color: "text-blue-600" },
    fake_job_offer_signals: { title: "Fake Job Offer Signals", icon: Briefcase, color: "text-yellow-600" },
    crypto_scam_patterns: { title: "Crypto Scam Patterns", icon: Globe, color: "text-indigo-400" },
    banking_fraud_patterns: { title: "Banking Fraud Patterns", icon: CreditCard, color: "text-red-600" },
    sim_and_mobile_security: { title: "SIM & Mobile Security", icon: Smartphone, color: "text-green-500" },
    romance_scam_indicators: { title: "Romance Scam Indicators", icon: Heart, color: "text-pink-600" },
    cyber_harassment_patterns: { title: "Cyber Harassment Patterns", icon: Users, color: "text-red-500" },
    safety_best_practices: { title: "Safety Best Practices", icon: CheckCircle, color: "text-green-500" },
    learning_resources: { title: "Learning Resources", icon: BookOpen, color: "text-blue-600" }
};

const CollapsibleSection = ({ sectionKey, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const config = SECTION_CONFIG[sectionKey] || { title: sectionKey.replace(/_/g, ' '), icon: Shield, color: "text-gray-500" };
    const Icon = config.icon;

    if (!data || data.length === 0) return null;

    return (
        <div className="mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gray-50 dark:bg-slate-700 ${config.color}`}>
                        <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{config.title}</h3>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-5 pt-0 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                            {sectionKey === 'learning_resources' ? (
                                <div className="space-y-3">
                                    {data.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.url || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-700 rounded-xl hover:shadow-md transition-shadow text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink size={18} />
                                            <span className="font-medium">{item.title || item}</span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {data.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CyberAwareness = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/universal/cyber-awareness');
                setData(res);
            } catch (error) {
                console.error("Failed to fetch awareness data", error);
                // Fallback for UI visualization if backend fails
                setData({
                    title: "Cyber Safety Awareness",
                    trending_scams: ["UPI Refund Scam", "Parcel Stuck at Customs"],
                    red_flags: ["Urgent pressure", "Unverified links"],
                    safe_banking_practices: ["Never share OTP", "Change PIN regularly"]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                        className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400"
                    >
                        <Shield size={32} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{data?.title || "Cyber Awareness"}</h1>
                    <p className="text-gray-600 dark:text-gray-300">Stay informed about the latest cyber threats and safety measures.</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {data && Object.keys(data).map((key) => {
                            // Skip non-array keys like title/version or empty arrays
                            if (!Array.isArray(data[key])) return null;
                            return <CollapsibleSection key={key} sectionKey={key} data={data[key]} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CyberAwareness;
