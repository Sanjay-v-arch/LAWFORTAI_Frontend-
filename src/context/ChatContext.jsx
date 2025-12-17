import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your Cyber Law Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = (text) => {
        const newMessage = { id: Date.now(), text, sender: 'user' };
        setMessages((prev) => [...prev, newMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "I'm processing your request. As an AI, I can help you find relevant laws or explain legal terms.",
                sender: 'bot'
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <ChatContext.Provider value={{ messages, isOpen, toggleChat, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};
