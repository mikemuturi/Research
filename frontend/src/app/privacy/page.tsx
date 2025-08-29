import React from 'react';
import { Shield, Lock, Eye, Users, FileText, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
// import Footer from '../components/ui/Footer';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';


const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <Navbar></Navbar>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your privacy and data security are our top priorities. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-blue-200 mt-4">Last updated: January 2025</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Overview */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy at a Glance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in transparency. Here's a quick overview of how we handle your data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Anonymous Option</h3>
              <p className="text-gray-600 text-sm">You can complete the assessment without providing personal information</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-gray-600 text-sm">All data is encrypted and stored securely using industry standards</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Selling</h3>
              <p className="text-gray-600 text-sm">We never sell, rent, or trade your personal information to third parties</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Only</h3>
              <p className="text-gray-600 text-sm">Data is used exclusively for research and improving connectivity solutions</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contents</h3>
              <nav className="space-y-3">
                <a href="#data-collection" className="block text-blue-600 hover:text-blue-800 transition-colors">Data Collection</a>
                <a href="#how-we-use" className="block text-blue-600 hover:text-blue-800 transition-colors">How We Use Data</a>
                <a href="#anonymous" className="block text-blue-600 hover:text-blue-800 transition-colors">Anonymous Submissions</a>
                <a href="#data-sharing" className="block text-blue-600 hover:text-blue-800 transition-colors">Data Sharing</a>
                <a href="#security" className="block text-blue-600 hover:text-blue-800 transition-colors">Data Security</a>
                <a href="#retention" className="block text-blue-600 hover:text-blue-800 transition-colors">Data Retention</a>
                <a href="#your-rights" className="block text-blue-600 hover:text-blue-800 transition-colors">Your Rights</a>
                <a href="#compliance" className="block text-blue-600 hover:text-blue-800 transition-colors">Compliance</a>
                <a href="#contact" className="block text-blue-600 hover:text-blue-800 transition-colors">Contact Us</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Data Collection */}
            <section id="data-collection" className="bg-white rounded-2xl shadow-lg p-10">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Data Collection and Purpose</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool 
                collects information to assess the readiness of institutions and service providers 
                for satellite internet adoption. This research is conducted to understand and improve 
                connectivity solutions in underserved areas.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Name (optional, can be anonymous)</li>
                    <li>• Email address (optional)</li>
                    <li>• Phone number (optional)</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Professional Information</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Role/position</li>
                    <li>• Institution name</li>
                    <li>• County/location</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Assessment Data</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Survey responses and ratings</li>
                    <li>• Readiness scores</li>
                    <li>• Assessment completion time</li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technical Information</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• IP address (for security)</li>
                    <li>• Submission timestamp</li>
                    <li>• Browser information</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section id="how-we-use" className="bg-white rounded-2xl shadow-lg p-10">
              <div className="flex items-center mb-6">
                <Globe className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Generate Assessment Reports</h4>
                    <p className="text-gray-600">Create personalized readiness assessment reports with scores and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Conduct Research</h4>
                    <p className="text-gray-600">Analyze trends and patterns in satellite internet adoption readiness</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Insights</h4>
                    <p className="text-gray-600">Develop aggregate statistics and insights (completely anonymized)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Improve the Tool</h4>
                    <p className="text-gray-600">Enhance the assessment methodology and user experience</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Anonymous Submissions */}
            <section id="anonymous" className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-10 text-white">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-blue-200 mr-3" />
                <h2 className="text-2xl font-bold">Anonymous Submissions</h2>
              </div>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                We strongly support your right to privacy. You can choose to submit your assessment anonymously.
              </p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">When you select anonymous submission:</h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-blue-300" />
                    Your name, email, and phone number will not be collected or stored
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-blue-300" />
                    You will still receive your complete assessment results
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-blue-300" />
                    Your responses will contribute to research insights (anonymously)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-blue-300" />
                    No way to trace responses back to you personally
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section id="security" className="bg-white rounded-2xl shadow-lg p-10">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                      <Lock className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Encrypted Transmission</h4>
                      <p className="text-gray-600 text-sm">All data is transmitted using HTTPS encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                      <Shield className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Storage</h4>
                      <p className="text-gray-600 text-sm">Database encryption and secure server infrastructure</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                      <Users className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Access Controls</h4>
                      <p className="text-gray-600 text-sm">Limited access to authorized research personnel only</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Regular Audits</h4>
                      <p className="text-gray-600 text-sm">Ongoing security assessments and monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="bg-white rounded-2xl shadow-lg p-10">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                You have comprehensive rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-purple-600" />
                    Access
                  </h4>
                  <p className="text-gray-700 text-sm">Request a copy of your personal information and assessment data</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Correction
                  </h4>
                  <p className="text-gray-700 text-sm">Request correction of any inaccurate information</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Deletion
                  </h4>
                  <p className="text-gray-700 text-sm">Request deletion of your personal information</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-green-600" />
                    Portability
                  </h4>
                  <p className="text-gray-700 text-sm">Request your data in a portable, machine-readable format</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl shadow-lg p-10 text-white">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                For questions about this privacy policy or to exercise your rights, please contact:
              </p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4">RAFSIA Research Team</h3>
                <div className="space-y-3 text-blue-100">
                  <p><strong>Privacy Officer:</strong> privacy@rafsia-assessment.org</p>
                  <p><strong>General Contact:</strong> research@rafsia-assessment.org</p>
                  <p><strong>Phone:</strong> +254 (0) 700 000 000</p>
                  <p><strong>Address:</strong> Research Institute, Nairobi, Kenya</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;