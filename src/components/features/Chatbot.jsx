import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';

const Chatbot = () => {
    const { isOpen, toggleChat, messages, sendMessage } = useChat();
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    // Voice Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!recognition) return;

        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };

        return () => {
            recognition.stop();
        }
    }, []);

    const handleMicClick = () => {
        if (!recognition) {
            alert("Voice input is not supported in this browser.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        sendMessage(inputText);
        setInputText('');
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-shadow"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-40 w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot size={20} />
                                <span className="font-semibold">Legal Assistant</span>
                            </div>
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">AI Powered</span>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900 scrollbar-thin scrollbar-thumb-gray-200">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleMicClick}
                                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500'
                                    }`}
                            >
                                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask a legal question..."
                                className="flex-1 bg-transparent border-none outline-none text-sm dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
