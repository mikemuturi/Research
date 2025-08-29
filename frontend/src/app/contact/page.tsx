'use client';

import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, MessageSquare,
  Clock, Globe, Users, Award, Target
} from 'lucide-react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions about the RAFSIA assessment tool? We're here to help you understand
            satellite internet readiness and support your connectivity journey.
          </p>
        </div>
      </section>

      {/* Contact Information (compact) */}
      <section className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600 text-sm">research@rafsia.assessment.org</p>
              <p className="text-gray-600 text-sm">support@rafsia.assessment.org</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p className="text-gray-600 text-sm">+254 (0) 700 000 000</p>
              <p className="text-gray-600 text-sm">+254 (0) 700 000 001</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-gray-600 text-sm">
                Rafsia Institute, Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us (Form) — its own section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center mb-8">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <Send className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all font-semibold text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <>
                      <Send size={20} className="mr-3" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Hours + Why Contact Us — same section */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Office Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Office Hours</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between"><span>Monday - Friday</span><span className="font-medium">8:00 AM - 5:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="font-medium">9:00 AM - 1:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-red-600">Closed</span></div>
            </div>
          </div>

          {/* Why Contact Us */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">Why Contact Us?</h3>
            <div className="space-y-4">
              <div className="flex items-center"><Users className="h-5 w-5 mr-3" />Expert research team</div>
              <div className="flex items-center"><Award className="h-5 w-5 mr-3" />Proven methodology</div>
              <div className="flex items-center"><Target className="h-5 w-5 mr-3" />Tailored solutions</div>
              <div className="flex items-center"><Globe className="h-5 w-5 mr-3" />Global best practices</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
