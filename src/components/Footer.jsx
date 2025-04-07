import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-500 text-white">
      <div className="max-w-screen-2xl container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-400 mb-4">
              Find your dream job or hire the perfect candidate with our job portal platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/my-job" className="text-gray-400 hover:text-white">My Jobs</Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white">Post a Job</Link>
              </li>
              <li>
                <Link to="/salary" className="text-gray-400 hover:text-white">Salary Estimator</Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-xl font-bold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/log-in" className="text-gray-400 hover:text-white">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up" className="text-gray-400 hover:text-white">Create Account</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Job Alerts</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Career Advice</a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-xl font-bold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white">Post a Job</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Pricing Plans</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Recruitment Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Employer Resources</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} JobPortal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 