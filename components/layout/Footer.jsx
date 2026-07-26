import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpg" alt="නැණසල Logo" className="w-8 h-8 object-contain rounded-lg" />
              <h3 className="font-bold text-lg">නැණසල</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier online destination for books, stationery, and educational resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link to="/books" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Books</Link></li>
              <li><Link to="/stationery" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Stationery</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/contact" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@smartbookshop.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>123 Book Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; 2024 නැණසල. All rights reserved. | Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
