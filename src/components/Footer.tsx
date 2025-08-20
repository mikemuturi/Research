import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;