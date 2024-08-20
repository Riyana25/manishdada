// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopHeader from './Header/topHeader';
import BottomHeader from './Header/Footer';
import HomeContent from './Home/Homecontent';
import { ChatProvider } from './contexts/ChatContext';
import Chat from './components/chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/chat" element={
              <ChatProvider>
                <div className="p-4">
                  <h1 className="text-4xl font-bold text-center py-6">Chat Application</h1>
                  <Chat />
                </div>
              </ChatProvider>
              
            } />
            {/* Add other routes here */}
          </Routes>
        </main>
        <BottomHeader />
      </div>
    </Router>
  );
}

export default App;
