import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook />
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} <span className="font-semibold">FindJob</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
