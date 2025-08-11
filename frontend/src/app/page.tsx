'use client';

import React from 'react';
import { ArrowRight, BarChart3, Shield, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">RAFSIA Assessment</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/admin/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Admin Login
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Assess Your Readiness for
            <span className="block text-blue-600">Satellite Internet Adoption</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool helps institutions 
            and service providers evaluate their preparedness across five critical dimensions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/survey">
              <Button size="lg" className="flex items-center space-x-2 text-lg px-8 py-4">
                <span>Start Assessment</span>
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Readiness Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">25+</div>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Readiness Assessment
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our framework evaluates readiness across five interconnected dimensions 
              that are critical for successful satellite internet adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  <BarChart3 size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Technical Readiness</h4>
                <p className="text-gray-600">
                  ICT infrastructure, power supply, equipment availability, and technical capacity.
                </p>
              </CardContent>
            </Card>

            {/* Economic Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                  <div className="text-xl font-bold">$</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Economic Readiness</h4>
                <p className="text-gray-600">
                  Affordability, funding mechanisms, budget allocation, and financial sustainability.
                </p>
              </CardContent>
            </Card>

            {/* Socio-Cultural Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                  <Users size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Socio-Cultural Readiness</h4>
                <p className="text-gray-600">
                  Digital literacy, community acceptance, cultural factors, and adoption willingness.
                </p>
              </CardContent>
            </Card>

            {/* Environmental Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg mb-4">
                  <Globe size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Environmental Readiness</h4>
                <p className="text-gray-600">
                  Environmental impact considerations, sustainability practices, and green ICT adoption.
                </p>
              </CardContent>
            </Card>

            {/* Policy & Regulatory */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mb-4">
                  <Shield size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Policy & Regulatory</h4>
                <p className="text-gray-600">
                  Government policies, regulatory frameworks, institutional policies, and compliance.
                </p>
              </CardContent>
            </Card>

            {/* Real-time Results */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg mb-4">
                  <BarChart3 size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h4>
                <p className="text-gray-600">
                  Get immediate feedback with detailed scores, visualizations, and actionable recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Who Can Use This Tool?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  Institutions of Higher Learning
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Universities and colleges
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Technical institutes and vocational schools
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Educational administrators and IT staff
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Lecturers, principals, and students
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  Internet Service Providers
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Satellite internet service providers
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Telecommunications companies
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Technology vendors and consultants
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Policy makers and regulators
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Assess Your Satellite Internet Readiness?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the comprehensive assessment now and get instant results with personalized 
            recommendations for improving your readiness.
          </p>
          
          <Link href="/survey">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 flex items-center space-x-2 mx-auto">
              <span>Start Your Assessment</span>
              <ArrowRight size={20} />
            </Button>
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
                <li><Link href="/survey" className="hover:text-white transition-colors">Take Assessment</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
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
              © 2025 RAFSIA Assessment Tool. All rights reserved. Built with Next.js and Django REST Framework.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}