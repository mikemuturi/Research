'use client';

import React from 'react';
import { ArrowRight, BarChart3, Shield, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import FAQ from '@/components/ui/FAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Assess Your Readiness for
            <span className="block text-blue-600 mt-2">Satellite Internet Adoption</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4 sm:px-0">
            The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool helps institutions 
            and service providers evaluate their preparedness across five critical dimensions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4 sm:px-0">
            <Link href="/survey" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                <span>Start Assessment</span>
                <ArrowRight size={20} />
              </Button>
            </Link>
            
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Learn More
              </Button>
            </Link>

          </div>

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-xs md:text-sm text-gray-600">Readiness Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">25+</div>
              <div className="text-xs md:text-sm text-gray-600">Assessment Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">2</div>
              <div className="text-xs md:text-sm text-gray-600">Target Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-xs md:text-sm text-gray-600">Free to Use</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Comprehensive Readiness Assessment
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Our framework evaluates readiness across five interconnected dimensions 
              that are critical for successful satellite internet adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Technical Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-100 text-blue-600 rounded-lg mb-3 md:mb-4">
                  <BarChart3 size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Technical Readiness</h4>
                <p className="text-sm md:text-base text-gray-600">
                  ICT infrastructure, power supply, equipment availability, and technical capacity.
                </p>
              </CardContent>
            </Card>

            {/* Economic Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-100 text-green-600 rounded-lg mb-3 md:mb-4">
                  <div className="text-lg md:text-xl font-bold">$</div>
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Economic Readiness</h4>
                <p className="text-sm md:text-base text-gray-600">
                  Affordability, funding mechanisms, budget allocation, and financial sustainability.
                </p>
              </CardContent>
            </Card>

            {/* Socio-Cultural Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-100 text-purple-600 rounded-lg mb-3 md:mb-4">
                  <Users size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Socio-Cultural Readiness</h4>
                <p className="text-sm md:text-base text-gray-600">
                  Digital literacy, community acceptance, cultural factors, and adoption willingness.
                </p>
              </CardContent>
            </Card>

            {/* Environmental Readiness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-100 text-emerald-600 rounded-lg mb-3 md:mb-4">
                  <Globe size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Environmental Readiness</h4>
                <p className="text-sm md:text-base text-gray-600">
                  Environmental impact considerations, sustainability practices, and green ICT adoption.
                </p>
              </CardContent>
            </Card>

            {/* Policy & Regulatory */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-amber-100 text-amber-600 rounded-lg mb-3 md:mb-4">
                  <Shield size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Policy & Regulatory</h4>
                <p className="text-sm md:text-base text-gray-600">
                  Government policies, regulatory frameworks, institutional policies, and compliance.
                </p>
              </CardContent>
            </Card>

            {/* Real-time Results */}
            <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-indigo-100 text-indigo-600 rounded-lg mb-3 md:mb-4">
                  <BarChart3 size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Instant Results</h4>
                <p className="text-sm md:text-base text-gray-600">
                  Get immediate feedback with detailed scores, visualizations, and actionable recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Who Can Use This Tool?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Institutions of Higher Learning
                </h4>
                <ul className="space-y-2 text-sm md:text-base text-gray-600">
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
              <CardContent className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Internet Service Providers
                </h4>
                <ul className="space-y-2 text-sm md:text-base text-gray-600">
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
      <section className="py-16 md:py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Assess Your Satellite Internet Readiness?
          </h3>
          <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Take the comprehensive assessment now and get instant results with personalized 
            recommendations for improving your readiness.
          </p>
          
          <Link href="/survey" className="inline-block">
            <Button size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center space-x-2">
              <span>Start Your Assessment</span>
              <ArrowRight size={20} />
            </Button>
          </Link>
          
          <p className="text-blue-200 text-xs md:text-sm mt-3 md:mt-4 px-4 sm:px-0">
            Takes approximately 10-15 minutes to complete • Completely free
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
      <Footer />
    </div>
  );
}