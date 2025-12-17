import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, Shield, ArrowRight, Star } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Signup Form State
    const [formData, setFormData] = useState({
        name: '',
        contact: '', // Email or Mobile
        password: '',
        role: 'Citizen',
        verificationId: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        // Simulate OTP sending
        setOtpSent(true);
        alert('Mock OTP: 1234');
    };

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        if (otp !== '1234') {
            alert('Invalid OTP');
            return;
        }
        // Success
        const newUser = {
            name: formData.name,
            email: formData.contact,
            role: formData.role,
            avatar: null,
            stats: { lawsRead: 0, savedItems: 0, testsTaken: 0 }
        };
        login(newUser);
        navigate('/profile');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login success
        const user = {
            name: "Demo User",
            email: formData.contact,
            role: "Citizen",
            avatar: null,
            stats: { lawsRead: 5, savedItems: 2, testsTaken: 1 }
        };
        login(user);
        navigate('/profile');
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                {/* Toggle Header */}
                <div className="flex border-b border-gray-100 dark:border-slate-700">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-4 text-sm font-semibold transition-colors ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-4 text-sm font-semibold transition-colors ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLogin}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email or Mobile</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your email or phone"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                                >
                                    Login
                                </button>
                                <p className="text-center text-sm text-gray-500">
                                    Forgot Password? <button type="button" className="text-blue-600 hover:underline">Reset</button>
                                </p>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="signup"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={otpSent ? handleVerifyAndSignup : handleSendOtp}
                                className="space-y-4"
                            >
                                {!otpSent && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Aditya Sharma"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email or Mobile</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Contact Info"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Citizen', 'Police', 'Legal'].map((role) => (
                                                    <button
                                                        key={role}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, role })}
                                                        className={`px-2 py-2 rounded-lg text-xs font-medium border flex flex-col items-center gap-1 transition-colors ${formData.role === role
                                                                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30'
                                                                : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-400'
                                                            }`}
                                                    >
                                                        {role === 'Citizen' && <User size={16} />}
                                                        {role === 'Police' && <Shield size={16} />}
                                                        {role === 'Legal' && <Star size={16} />}
                                                        {role}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {formData.role !== 'Citizen' && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {formData.role === 'Police' ? 'Police ID Number' : 'Bar Council ID'}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="verificationId"
                                                    value={formData.verificationId}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder={formData.role === 'Police' ? 'PID-XXXX-YYYY' : 'BCI/XXXX/YYYY'}
                                                    required
                                                />
                                                <p className="text-xs text-orange-500"> Verification required for this role.</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {otpSent && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter OTP</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                                            placeholder="XXXX"
                                            maxLength={4}
                                            autoFocus
                                        />
                                        <p className="text-xs text-center text-gray-500">OTP sent to {formData.contact}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                                >
                                    {otpSent ? 'Verify & Sign Up' : 'Get OTP'}
                                    {!otpSent && <ArrowRight size={16} />}
                                </button>
                                {otpSent && (
                                    <button type="button" onClick={() => setOtpSent(false)} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-2">Change Contact Info</button>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Auth;
