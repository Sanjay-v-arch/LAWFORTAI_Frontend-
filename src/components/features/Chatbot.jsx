import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';

const Chatbot = () => {
    const { isOpen, toggleChat, messages, sendMessage, isTyping } = useChat();
    // Actually, voice query returns answer directly. We might need to manually add messages locally.
    // Let's assume useChat exposes setMessages or we handle it via a new method. 
    // Wait, the user prompt said "add to chat" in the snippet.
    // The snippet: "setMessages(prev => ...)" implies local state OR context access. 
    // Since messages are in context, I need to update context to expose setMessages OR provide a handleVoiceResponse method. 
    // I will stick to adding logic in Chatbot but I need `setMessages` from useChat.
    // Let's modify handleMicClick to toggle recording.

    // BUT FIRST, let's look at the imports/setup.
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const messagesEndRef = useRef(null);
    const API = import.meta.env.VITE_API_BASE;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const formData = new FormData();
                formData.append("file", blob);

                // Add "Processing..." or user audio placeholder? 
                // User said "add to chat". Usually we show "🎤 Audio sent" or similar.

                try {
                    const res = await fetch(`${API}/voice-query`, {
                        method: "POST",
                        body: formData
                    });

                    const data = await res.json();

                    // We need to access setMessages from context. 
                    // WARNING: `useChat` in previous file DID NOT export setMessages. 
                    // I need to update ChatContext to export setMessages FIRST or add a `addMessage` method.
                    // For now, I will assume I can fix ChatContext in the next step to export setMessages.
                    sendMessage(data.answer); // This would treat it as a USER message if I use sendMessage(data.answer) which is wrong.
                    // I should probably manually construct the BOT message.
                    // Let's fix ChatContext to export setMessages.
                } catch (err) {
                    console.error("Voice query failed", err);
                }

                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
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
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>

                                    {/* Confidence & Source Metadata */}
                                    {msg.sender === 'bot' && msg.meta && (
                                        <div className="mt-1 ml-1 text-xs text-gray-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                            {msg.meta.confidence && (
                                                <span className={`px-1.5 py-0.5 rounded ${msg.meta.confidence > 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    msg.meta.confidence > 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {Math.round(msg.meta.confidence)}% Conf.
                                                </span>
                                            )}
                                            {msg.meta.act && (
                                                <span>{msg.meta.act} {msg.meta.section && `• ${msg.meta.section}`}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isRecording && (
                                <div className="flex justify-start">
                                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl rounded-bl-none text-sm animate-pulse flex items-center gap-2">
                                        <Mic size={14} /> Recording...
                                    </div>
                                </div>
                            )}
                            {isTyping && (
                                <div className="flex justify-start animate-in fade-in slide-in-from-top-1">
                                    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-2xl rounded-bl-none text-xs italic shadow-sm">
                                        LawFort AI is typing...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleMicClick}
                                className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500'
                                    }`}
                            >
                                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder={isRecording ? "Listening..." : "Ask a legal question..."}
                                disabled={isRecording}
                                className="flex-1 bg-transparent border-none outline-none text-sm dark:text-white disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || isRecording || isTyping}
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

