// src/HomeContent.js
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';

const HomeContent = () => {
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');

    return (
        <div className="bg-white text-gray-900 py-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300">
                    <h2 className="text-3xl font-bold mb-6">Request a Ride</h2>
                    <div className="text-gray-700 mb-6">
                        <p className="text-lg">Add your trip details, hop in, and go.</p>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-500" size={20} />
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location"
                                className="w-full px-12 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <FaMapPin className="absolute top-3 left-3 text-gray-500" size={20} />
                            <input
                                id="destination"
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Enter destination"
                                className="w-full px-12 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <button className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-150 ease-in-out">
                            See prices
                        </button>
                    </div>
                    <div className="mb-6">
                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-150 ease-in-out">
                            Schedule for later
                        </button>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <iframe
                            title="Google Map of Kathmandu"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14112.636077424248!2d85.3240045939803!3d27.717245542191897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19152a953f97%3A0x1039e8a2e8e63f09!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1675423583817!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
