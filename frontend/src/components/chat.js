// src/components/Chat.jsx
import React, { useContext, useEffect, useState } from 'react';
import ChatContext from '../contexts/ChatContext';

const Chat = () => {
    const { chatHistory, fetchChatHistory, sendMessage, setRideId } = useContext(ChatContext);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const rideId = 'some-ride-id'; // Replace with actual rideId
        setRideId(rideId);
        fetchChatHistory(rideId);
    }, [fetchChatHistory, setRideId]);

    const handleSendMessage = () => {
        if (inputValue) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded-lg p-4 mb-4">
                <div className="space-y-2">
                    {chatHistory.map((msg) => (
                        <div key={msg._id} className="flex items-start space-x-2">
                            <div className="font-semibold text-blue-600">{msg.sender.name}:</div>
                            <div className="bg-gray-200 p-2 rounded-lg">{msg.message}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
