import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, BarChart3, Globe, Shield, CheckCircle, ArrowRight, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About RAFSIA
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Readiness Assessment Framework for Satellite Internet Adoption (RAFSIA) is a comprehensive 
              evaluation tool designed to measure institutional and organizational preparedness for satellite 
              internet technology implementation.
            </p>
          </div>
        </div>

        {/* What is RAFSIA */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">What is RAFSIA?</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                RAFSIA is a research-based assessment framework developed to evaluate the readiness of 
                institutions and service providers for adopting satellite internet technology. The framework 
                addresses the growing need for reliable internet connectivity in underserved areas, particularly 
                in educational institutions and rural communities.
              </p>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our tool provides a systematic approach to measuring readiness across five critical dimensions, 
                offering actionable insights and recommendations for successful satellite internet implementation.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive readiness evaluation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Evidence-based recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time results and visualization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Free and accessible to all</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Five Dimensions */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">The Five RAFSIA Dimensions</h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Our assessment framework evaluates readiness across five interconnected dimensions, 
            each critical for successful satellite internet adoption.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Technical Readiness */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Readiness</h3>
              <p className="text-gray-600 text-sm mb-3">
                Evaluates ICT infrastructure, power supply reliability, equipment availability, and technical capacity.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Infrastructure adequacy</li>
                <li>• Power supply systems</li>
                <li>• Technical expertise</li>
                <li>• Equipment availability</li>
              </ul>
            </div>

            {/* Economic Readiness */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                <div className="text-xl font-bold">$</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Economic Readiness</h3>
              <p className="text-gray-600 text-sm mb-3">
                Assesses affordability, funding mechanisms, budget allocation, and financial sustainability.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Cost affordability</li>
                <li>• Funding availability</li>
                <li>• Budget planning</li>
                <li>• Financial sustainability</li>
              </ul>
            </div>

            {/* Socio-Cultural Readiness */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Socio-Cultural Readiness</h3>
              <p className="text-gray-600 text-sm mb-3">
                Measures digital literacy, community acceptance, cultural factors, and adoption willingness.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Digital literacy levels</li>
                <li>• Community acceptance</li>
                <li>• Cultural compatibility</li>
                <li>• User willingness</li>
              </ul>
            </div>

            {/* Environmental Readiness */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Readiness</h3>
              <p className="text-gray-600 text-sm mb-3">
                Evaluates environmental impact considerations, sustainability practices, and green ICT adoption.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Environmental policies</li>
                <li>• Sustainability practices</li>
                <li>• Green ICT adoption</li>
                <li>• Impact assessment</li>
              </ul>
            </div>

            {/* Policy & Regulatory */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Policy & Regulatory</h3>
              <p className="text-gray-600 text-sm mb-3">
                Assesses government policies, regulatory frameworks, institutional policies, and compliance.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Government support</li>
                <li>• Regulatory framework</li>
                <li>• Institutional policies</li>
                <li>• Compliance readiness</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">How RAFSIA Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Assessment</h3>
              <p className="text-gray-600 text-sm">
                Complete a comprehensive questionnaire covering all five readiness dimensions. 
                The assessment takes 10-15 minutes and can be done anonymously.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive instant results with detailed scores for each dimension, 
                visual charts, and an overall readiness level classification.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Action</h3>
              <p className="text-gray-600 text-sm">
                Follow personalized recommendations to improve your readiness scores 
                and prepare for successful satellite internet adoption.
              </p>
            </div>
          </div>
        </section>

        {/* Target Users */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Who Should Use RAFSIA?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Institutions of Higher Learning</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <BookOpen size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Educational Institutions</p>
                    <p className="text-sm text-gray-600">Universities, colleges, technical institutes, and vocational schools</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Educational Stakeholders</p>
                    <p className="text-sm text-gray-600">Lecturers, administrators, IT staff, principals, and students</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Providers & Organizations</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Globe size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Internet Service Providers</p>
                    <p className="text-sm text-gray-600">Satellite ISPs, telecommunications companies, and technology vendors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Policy Makers</p>
                    <p className="text-sm text-gray-600">Government agencies, regulators, and development organizations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Background */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Research Background</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4 leading-relaxed">
              The RAFSIA framework was developed through extensive research into the challenges and opportunities 
              of satellite internet adoption in developing countries, with a particular focus on educational 
              institutions in Kenya. The framework addresses the complex interplay of technical, economic, 
              social, environmental, and regulatory factors that influence successful technology adoption.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Our research identified that successful satellite internet adoption requires more than just 
              technical infrastructure. It demands a holistic approach that considers economic sustainability, 
              social acceptance, environmental responsibility, and regulatory compliance. The RAFSIA framework 
              provides a structured methodology for evaluating these multifaceted requirements.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Objectives</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  Develop a comprehensive readiness assessment framework
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  Identify key factors influencing satellite internet adoption
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  Provide actionable insights for stakeholders
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  Support evidence-based decision making
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Assess Your Readiness?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take the RAFSIA assessment today and discover your organization's readiness for 
            satellite internet adoption. Get instant results with personalized recommendations.
          </p>
          
          <Link 
            to="/survey"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <span>Start Assessment</span>
            <ArrowRight size={20} className="ml-2" />
          </Link>
          
          <p className="text-blue-200 text-sm mt-4">
            Free • Anonymous option available • Takes 10-15 minutes
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;