import React from 'react';
import { Target, Users, BarChart3, Globe, Shield, CheckCircle, ArrowRight, BookOpen, Lightbulb, TrendingUp, Award, Zap, Heart } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';


const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar></Navbar>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About RAFSIA</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            The Readiness Assessment Framework for Satellite Internet Adoption (RAFSIA) is a comprehensive 
            evaluation tool designed to measure institutional and organizational preparedness for satellite 
            internet technology implementation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What is RAFSIA */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="flex items-center mb-8">
            <Target className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">What is RAFSIA?</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                RAFSIA is a research-based assessment framework developed to evaluate the readiness of 
                institutions and service providers for adopting satellite internet technology. The framework 
                addresses the growing need for reliable internet connectivity in underserved areas, particularly 
                in educational institutions and rural communities.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Our tool provides a systematic approach to measuring readiness across five critical dimensions, 
                offering actionable insights and recommendations for successful satellite internet implementation.
              </p>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  Research Excellence
                </h3>
                <p className="text-gray-700">
                  Developed through rigorous academic research and validated through extensive field testing 
                  across multiple institutions in Kenya and East Africa.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive readiness evaluation across 5 dimensions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Evidence-based recommendations for improvement</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time results with interactive visualizations</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Free and accessible to all institutions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Anonymous submission options for privacy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              To bridge the digital divide by providing institutions and service providers with 
              comprehensive assessment tools that enable informed decision-making for satellite 
              internet adoption.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                We strive to accelerate connectivity in underserved areas through 
                evidence-based readiness evaluation and actionable recommendations.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A world where every institution and community has access to reliable, affordable 
              internet connectivity, regardless of geographic constraints.
            </p>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800 font-medium">
                We envision satellite internet technology as a catalyst for educational advancement, 
                economic development, and social progress in all regions.
              </p>
            </div>
          </div>
        </section>

        {/* Five Dimensions */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="flex items-center mb-8">
            <BarChart3 className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">The Five RAFSIA Dimensions</h2>
          </div>
          
          <p className="text-gray-600 text-lg mb-12 text-center max-w-3xl mx-auto">
            Our assessment framework evaluates readiness across five interconnected dimensions, 
            each critical for successful satellite internet adoption.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Readiness */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-xl mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Readiness</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Evaluates ICT infrastructure, power supply reliability, equipment availability, and technical capacity.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Infrastructure adequacy assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Power supply systems evaluation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Technical expertise analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Equipment availability review
                </li>
              </ul>
            </div>

            {/* Economic Readiness */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-xl mb-6">
                <div className="text-2xl font-bold">$</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Economic Readiness</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Assesses affordability, funding mechanisms, budget allocation, and financial sustainability.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Cost affordability analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Funding availability assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Budget planning evaluation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Financial sustainability review
                </li>
              </ul>
            </div>

            {/* Socio-Cultural Readiness */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-xl mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Socio-Cultural Readiness</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Measures digital literacy, community acceptance, cultural factors, and adoption willingness.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Digital literacy assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Community acceptance evaluation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Cultural compatibility analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  User willingness measurement
                </li>
              </ul>
            </div>

            {/* Environmental Readiness */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-xl mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Readiness</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Evaluates environmental impact considerations, sustainability practices, and green ICT adoption.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Environmental policy review
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Sustainability practices audit
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Green ICT adoption assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Impact assessment protocols
                </li>
              </ul>
            </div>

            {/* Policy & Regulatory */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 text-white rounded-xl mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy & Regulatory</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Assesses government policies, regulatory frameworks, institutional policies, and compliance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Government support evaluation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Regulatory framework analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Institutional policy review
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Compliance readiness check
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="flex items-center mb-8">
            <Lightbulb className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">How RAFSIA Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Take Assessment</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete a comprehensive questionnaire covering all five readiness dimensions. 
                The assessment takes 10-15 minutes and can be done anonymously for privacy.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant results with detailed scores for each dimension, 
                interactive visualizations, and an overall readiness level classification.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Take Action</h3>
              <p className="text-gray-600 leading-relaxed">
                Follow personalized recommendations to improve your readiness scores 
                and prepare for successful satellite internet adoption.
              </p>
            </div>
          </div>
        </section>

        {/* Target Users */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="flex items-center mb-8">
            <Users className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Who Should Use RAFSIA?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Institutions of Higher Learning</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <BookOpen size={20} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Educational Institutions</p>
                    <p className="text-gray-600">Universities, colleges, technical institutes, and vocational schools</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users size={20} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Educational Stakeholders</p>
                    <p className="text-gray-600">Lecturers, administrators, IT staff, principals, and students</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Providers & Organizations</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Globe size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Internet Service Providers</p>
                    <p className="text-gray-600">Satellite ISPs, telecommunications companies, and technology vendors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Policy Makers</p>
                    <p className="text-gray-600">Government agencies, regulators, and development organizations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Background */}
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl shadow-lg p-12 text-white mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="h-10 w-10 text-blue-400 mr-4" />
            <h2 className="text-3xl font-bold">Research Background</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                The RAFSIA framework was developed through extensive research into the challenges and opportunities 
                of satellite internet adoption in developing countries, with a particular focus on educational 
                institutions in Kenya.
              </p>

              <p className="text-blue-100 text-lg leading-relaxed">
                Our research identified that successful satellite internet adoption requires more than just 
                technical infrastructure. It demands a holistic approach that considers economic sustainability, 
                social acceptance, environmental responsibility, and regulatory compliance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Research Objectives</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">Develop a comprehensive readiness assessment framework</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">Identify key factors influencing satellite internet adoption</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">Provide actionable insights for stakeholders</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-blue-100">Support evidence-based decision making</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <Zap className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-6">Ready to Assess Your Readiness?</h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Take the RAFSIA assessment today and discover your organization's readiness for 
              satellite internet adoption. Get instant results with personalized recommendations.
            </p>
            
            <a 
              href="/survey"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Start Assessment</span>
              <ArrowRight size={24} className="ml-3" />
            </a>
            
            <p className="text-blue-200 text-sm mt-6">
              Free • Anonymous option available • Takes 10-15 minutes • Instant results
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;