import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Gavel } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <Gavel size={24} className="text-blue-500" />
                            <span className="text-xl font-bold">LawFort</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Navigate the digital legal world with confidence. Powered by AI, designed for citizens.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link to="/laws" className="text-sm hover:text-blue-400 transition-colors">Law Library</Link></li>
                            <li><Link to="/about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link to="/profile" className="text-sm hover:text-blue-400 transition-colors">My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/help" className="text-sm hover:text-blue-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/guides" className="text-sm hover:text-blue-400 transition-colors">Legal Guides</Link></li>
                            <li><Link to="/api" className="text-sm hover:text-blue-400 transition-colors">API Access</Link></li>
                            <li><Link to="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/disclaimer" className="text-sm hover:text-blue-400 transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-sm text-center text-gray-500">
                    &copy; {new Date().getFullYear()} LawFort. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
