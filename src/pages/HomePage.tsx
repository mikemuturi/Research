import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Globe, Users, CheckCircle, Target, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Assess Your Readiness for
            <span className="block text-blue-600 mt-2">Satellite Internet Adoption</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool helps institutions 
            and service providers evaluate their preparedness across five critical dimensions for successful 
            satellite internet implementation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/survey"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Start Assessment</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link 
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg border-2 border-blue-600 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Readiness Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">40+</div>
              <div className="text-sm text-gray-600">Assessment Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
              <div className="text-sm text-gray-600">Target Groups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Readiness Assessment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our framework evaluates readiness across five interconnected dimensions 
              that are critical for successful satellite internet adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Readiness */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Readiness</h3>
              <p className="text-gray-600">
                ICT infrastructure, power supply, equipment availability, and technical capacity assessment.
              </p>
            </div>

            {/* Economic Readiness */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                <div className="text-xl font-bold">$</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Economic Readiness</h3>
              <p className="text-gray-600">
                Affordability, funding mechanisms, budget allocation, and financial sustainability evaluation.
              </p>
            </div>

            {/* Socio-Cultural Readiness */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Socio-Cultural Readiness</h3>
              <p className="text-gray-600">
                Digital literacy, community acceptance, cultural factors, and adoption willingness analysis.
              </p>
            </div>

            {/* Environmental Readiness */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Environmental Readiness</h3>
              <p className="text-gray-600">
                Environmental impact considerations, sustainability practices, and green ICT adoption.
              </p>
            </div>

            {/* Policy & Regulatory */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Policy & Regulatory</h3>
              <p className="text-gray-600">
                Government policies, regulatory frameworks, institutional policies, and compliance assessment.
              </p>
            </div>

            {/* Real-time Results */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get immediate feedback with detailed scores, visualizations, and actionable recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Can Use This Tool?</h2>
            <p className="text-lg text-gray-600">
              Designed for institutions and service providers across Kenya and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Institutions of Higher Learning
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Universities and colleges
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Technical institutes and vocational schools
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Educational administrators and IT staff
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Lecturers, principals, and students
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Internet Service Providers
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Satellite internet service providers
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Telecommunications companies
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Technology vendors and consultants
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Policy makers and regulators
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about the RAFSIA assessment tool and satellite internet readiness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How long does the assessment take?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The RAFSIA assessment typically takes 10-15 minutes to complete, depending on your 
                role and the depth of your responses. The assessment is designed to be comprehensive 
                yet efficient.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Is my data secure and private?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we take data security seriously. All responses are encrypted and stored securely. 
                You can also choose to submit anonymously, and we comply with all applicable data 
                protection regulations.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Can I retake the assessment?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, you can retake the assessment at any time to track improvements in your 
                readiness scores over time. This is particularly useful for monitoring progress 
                after implementing recommendations.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How are the results calculated?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Results are calculated based on your responses across five dimensions using a 
                validated scoring methodology developed through extensive research and field testing 
                with institutions across Kenya.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Who can use this assessment?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The assessment is designed for institutions of higher learning (universities, colleges, 
                technical institutes) and internet service providers looking to evaluate their readiness 
                for satellite internet adoption.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What happens after I complete the assessment?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You'll receive instant results with detailed scores, visualizations, and personalized 
                recommendations. You can also download a PDF report and share your results with 
                stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Assess Your Satellite Internet Readiness?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the comprehensive assessment now and get instant results with personalized 
            recommendations for improving your readiness.
          </p>
          
          <Link 
            to="/survey"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Start Your Assessment</span>
            <ArrowRight size={20} className="ml-2" />
          </Link>
          
          <p className="text-blue-200 text-sm mt-4">
            Takes approximately 10-15 minutes to complete • Completely free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-lg font-semibold">RAFSIA Assessment</span>
              </div>
              <p className="text-gray-400">
                A comprehensive framework for evaluating readiness for satellite internet adoption 
                in institutions and service providers.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/survey" className="hover:text-white transition-colors">Take Assessment</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About RAFSIA</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">
                For questions about this assessment tool or research inquiries, 
                please contact the research team.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 RAFSIA Assessment Tool. All rights reserved. Built for satellite internet readiness evaluation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;