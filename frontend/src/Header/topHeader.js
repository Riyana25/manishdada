// src/TopHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopHeader = () => (
    <div className="bg-gray-900 text-white">
        <nav className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-2xl font-bold hover:text-gray-400">BookMyRide</Link>
                <div className="hidden md:flex space-x-6">
                    <Link to="/ride" className="hover:text-gray-400">Ride</Link>
                    <Link to="/drive" className="hover:text-gray-400">Drive</Link>
                    <Link to="/business" className="hover:text-gray-400">Business</Link>
                    <Link to="/about" className="hover:text-gray-400">About</Link>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <select className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Eng</option>
                    <option>Nep</option>
                    {/* Add more language options here */}
                </select>
                <Link to="/help" className="hover:text-gray-400">Help</Link>
                <Link to="/login" className="hover:text-gray-400">Log in</Link>
                <Link
                    to="/signup"
                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                    Sign up
                </Link>
            </div>
        </nav>
    </div>
);

export default TopHeader;
