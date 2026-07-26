import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactPage = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="section-title text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <form className="card p-8 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button className="w-full btn btn-primary">Send Message</button>
        </form>
        <div className="space-y-6">
          <div className="card p-6 flex gap-4">
            <Mail className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@smartbookshop.com</p>
            </div>
          </div>
          <div className="card p-6 flex gap-4">
            <Phone className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="card p-6 flex gap-4">
            <MapPin className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">123 Book Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
