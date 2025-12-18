import React, { createContext, useContext, useState } from 'react';
import { post } from '../utils/api';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your Cyber Law Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const addMessage = (message, sender = 'bot', meta = null) => {
        setMessages((prev) => [...prev, {
            id: Date.now(),
            text: message,
            sender,
            meta
        }]);
    };

    const sendMessage = async (text) => {
        if (!text || !text.trim()) return;

        // 1. Add User Message
        const userMsg = { id: Date.now(), text, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        try {
            // 2. API Request
            // Note: The API_BASE is handled inside utils/api.js, so we pass the endpoint directly.
            const data = await post('/text-query', { query: text.trim() });

            // 3. Handle Response
            if (!data.answer) {
                addMessage("Sorry, I couldn't find a relevant legal section.", 'bot');
            } else {
                addMessage(data.answer, 'bot', {
                    act: data.act,
                    section: data.section,
                    confidence: data.confidence ? data.confidence * 100 : null // Assuming 0-1 scale
                });
            }

        } catch (err) {
            console.error("Chatbot error:", err);
            addMessage("Unable to reach LawFort AI. Please try again.", 'bot', { isError: true });
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <ChatContext.Provider value={{ messages, isOpen, toggleChat, sendMessage, isTyping }}>
            {children}
        </ChatContext.Provider>
    );
};
