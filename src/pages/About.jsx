import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Globe, Scale, BookOpen, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const stats = [
        { label: "Active Users", value: "50K+", icon: Users },
        { label: "Laws Indexed", value: "2,000+", icon: BookOpen },
        { label: "Legal Experts", value: "500+", icon: Scale },
        { label: "Cities Covered", value: "120+", icon: Globe },
    ];

    const values = [
        {
            title: "Accessibility",
            description: "Making complex legal information understanding for everyone, regardless of their legal background.",
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            title: "Transparency",
            description: "Providing clear, accurate, and up-to-date legal data directly from verified sources.",
            icon: Shield,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20"
        },
        {
            title: "Empowerment",
            description: "Empowering citizens with the knowledge they need to protect their rights in the digital age.",
            icon: Award,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-20 lg:pt-32 lg:pb-28">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6"
                        >
                            Our Mission
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
                        >
                            Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cyber Law</span> for Everyone
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
                        >
                            LawFort bridges the gap between complex legal statutes and the common citizen. We believe that understanding your digital rights shouldn't require a law degree.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="-mt-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-slate-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 mb-4">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Story / Context Section */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why We Started LawFort</h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                In an increasingly digital world, cyber crime is rising, yet legal literacy remains low. The complexities of acts like the IT Act 2000 or the new DPDP Act 2023 often leave citizens confused about their rights and remedies.
                            </p>
                            <p>
                                We recognized a critical need: a platform that doesn't just list laws, but *translates* them. A place where a student, a small business owner, or a victim of cyber bullying can find immediate, understandable answers.
                            </p>
                            <div className="flex flex-col gap-3 mt-6">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span>Simplified legal explanations powered by AI</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span>Real-time updates on new amendments</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span>Verified resources for legal aid</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
                        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-slate-700">
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-slate-700 pb-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                                    L
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">LawFort Platform</h4>
                                    <p className="text-sm text-gray-500">Established 2024</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                                "Our goal is not to replace lawyers, but to make the law accessible enough that you know when and why you need one."
                            </p>
                            <div className="flex items-center justify-between mt-8">
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">Aditya & Team</div>
                                <div className="h-10 w-24 bg-gray-100 dark:bg-slate-700 rounded-md"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 dark:bg-slate-800/50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Every feature we build and every law we explain is guided by these three fundamental principles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-14 h-14 rounded-xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                    Ready to explore your rights?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                    Dive into our comprehensive law library or ask our AI assistant for immediate help.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/laws')}
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
                    >
                        Browse Laws
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto"
                    >
                        Join the Community
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
