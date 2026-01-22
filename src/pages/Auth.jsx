import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { post } from '../utils/api';
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
    // API_BASE handled in utils/api.js

    const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Password

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // STEP 1: GET OTP
    // STEP 1: SIGNUP & GET OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            // FORCE-SAFE PAYLOAD: Password Validation
            if (!formData.password || formData.password.trim() === "") {
                alert("Password cannot be empty");
                return;
            }

            if (!formData.name || !formData.contact || !formData.role) {
                alert("Please fill in all fields");
                return;
            }

            const payload = {
                name: formData.name.trim(),
                contact: formData.contact.trim(),
                password: formData.password,
                role: formData.role.toLowerCase(),
                policeId: formData.role === "Police" ? formData.verificationId?.trim() || null : null,
                lawyerId: formData.role === "Lawyer" ? formData.verificationId?.trim() || null : null
            };

            // Note: Sending to signup endpoint to trigger OTP
            await post('/api/auth/signup', payload);
            setStep(2);
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            alert("Signup failed: " + error.message);
        }
    };

    // STEP 2: VERIFY OTP
    // STEP 2: VERIFY OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("OTP must be 6 digits");
            return;
        }
        try {
            const res = await post('/api/auth/verify-otp', { contact: formData.contact, otp });
            alert(res.message || "Account verified! Please login.");
            setIsLogin(true);
            setStep(1);
            setOtpSent(false);
        } catch (error) {
            console.error(error);
            alert("Verification failed: " + error.message);
        }
    };



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                contact: formData.contact.trim(),
                password: formData.password
            };
            const data = await post('/api/auth/login', payload);

            if (data.token) {
                const userWithRole = {
                    ...data.user,
                    role: data.user.role,
                    token: data.token
                };
                login(userWithRole);
                navigate('/profile');
                alert("Login successful!");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
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
                                onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
                                className="space-y-4"
                            >
                                {/* Step 1 & 2: Registration Details (Visible but disabled in Step 2 & 3) */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={step > 1}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${step > 1 ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' : ''} border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Aditya Sharma"
                                            required={step === 1}
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
                                            disabled={step > 1}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${step > 1 ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' : ''} border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Contact Info"
                                            required={step === 1}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Citizen', 'Police', 'Lawyer'].map((role) => (
                                            <button
                                                key={role}
                                                type="button"
                                                disabled={step > 1}
                                                onClick={() => setFormData({ ...formData, role })}
                                                className={`px-2 py-2 rounded-lg text-xs font-medium border flex flex-col items-center gap-1 transition-colors ${formData.role === role
                                                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30'
                                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-400'
                                                    } ${step > 1 ? 'opacity-60 cursor-not-allowed' : ''}`}
                                            >
                                                {role === 'Citizen' && <User size={16} />}
                                                {role === 'Police' && <Shield size={16} />}
                                                {role === 'Lawyer' && <Star size={16} />}
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
                                            disabled={step > 1}
                                            className={`w-full px-4 py-2 rounded-lg border ${step > 1 ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' : ''} border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder={formData.role === 'Police' ? 'PID-XXXX-YYYY' : 'BCI/XXXX/YYYY'}
                                            required={step === 1}
                                        />
                                        {step === 1 && <p className="text-xs text-orange-500"> Verification required for this role.</p>}
                                    </div>
                                )}

                                {/* Step 2: OTP Input */}
                                {step === 2 && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter OTP</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            inputMode="numeric"
                                            pattern="[0-9]{6}"
                                            value={otp}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                if (value.length <= 6) setOtp(value);
                                            }}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                                            placeholder="XXXXXX"
                                            autoFocus
                                            required
                                        />
                                        <p className="text-xs text-center text-gray-500">OTP sent to {formData.contact}</p>
                                    </div>
                                )}

                                {/* Password Field Moved to Step 1 */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Set Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            disabled={step > 1}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${step > 1 ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' : ''} border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Create a strong password"
                                            required={step === 1}
                                        />
                                    </div>
                                </div>
                                

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                                >
                                    {step === 1 && <>Get OTP <ArrowRight size={16} /></>}
                                    {step === 2 && 'Verify & Sign Up'}
                                </button>

                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => { setStep(1); setOtpSent(false); }}
                                        className="w-full text-sm text-gray-500 hover:text-gray-700 mt-2"
                                    >
                                        Start Over
                                    </button>
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
