// src/contexts/ChatContext.js
import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ChatContext = createContext();

const socket = io('http://localhost:5002');

export const ChatProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [rideId, setRideId] = useState('');

    useEffect(() => {
        socket.on('notification', (notification) => {
            setChatHistory((prev) => [...prev, notification]);
        });

        return () => socket.off('notification');
    }, []);

    const fetchChatHistory = async (rideId) => {
        try {
            const { data } = await axios.get(`/api/chat/history/${rideId}`);
            setChatHistory(data.chatHistory);
        } catch (error) {
            console.error('Error fetching chat history', error);
        }
    };

    const sendMessage = async (message) => {
        try {
            const { data } = await axios.post('/api/chat/send', { rideId, message });
            socket.emit('sendNotification', data.chatMessage);
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <ChatContext.Provider value={{ chatHistory, fetchChatHistory, sendMessage, setRideId, setMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
