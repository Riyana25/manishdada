// src/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-black text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Column 1 */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2">BookMyRide</h3>
          <ul className="space-y-3">
            <li><a href="/help-center" className="hover:text-gray-400 transition-colors">Visit Help Center</a></li>
            <li><a href="/about-us" className="hover:text-gray-400 transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2">Our Offerings</h3>
          <ul className="space-y-3">
            <li><a href="/newsroom" className="hover:text-gray-400 transition-colors">Newsroom</a></li>
            <li><a href="/investors" className="hover:text-gray-400 transition-colors">Investors</a></li>
            <li><a href="/blog" className="hover:text-gray-400 transition-colors">Blog</a></li>
            <li><a href="/careers" className="hover:text-gray-400 transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2">Products</h3>
          <ul className="space-y-3">
            <li><a href="/ride" className="hover:text-gray-400 transition-colors">Ride</a></li>
            <li><a href="/drive" className="hover:text-gray-400 transition-colors">Drive</a></li>
            <li><a href="/deliver" className="hover:text-gray-400 transition-colors">Deliver</a></li>
            <li><a href="/eat" className="hover:text-gray-400 transition-colors">Eat</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2">Global Citizenship</h3>
          <ul className="space-y-3">
            <li><a href="/safety" className="hover:text-gray-400 transition-colors">Safety</a></li>
            <li><a href="/sustainability" className="hover:text-gray-400 transition-colors">Sustainability</a></li>
            <li><a href="/travel" className="hover:text-gray-400 transition-colors">Travel</a></li>
            <li><a href="/reserve" className="hover:text-gray-400 transition-colors">Reserve</a></li>
            <li><a href="/cities" className="hover:text-gray-400 transition-colors">Cities</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" className="text-white hover:text-gray-400 transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400 transition-colors">
            <FaTwitter size={24} />
          </a>
        </div>
        <div className="text-center text-sm mb-6">
          <p className="mb-2">
            <a href="/download-android" className="hover:text-gray-400 transition-colors">Download the app for Android</a> |
            <a href="/download-ios" className="hover:text-gray-400 transition-colors">Download the app for iOS</a>
          </p>
          <p>© 2024 BookMyRide Technologies Inc.</p>
        </div>
        <div className="text-center text-sm">
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a> |
          <a href="/accessibility" className="hover:text-gray-400 transition-colors">Accessibility</a> |
          <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
