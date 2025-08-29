import React from "react";
import { Globe } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3 md:mb-4">
              <Globe className="h-5 w-5 md:h-6 md:w-6 text-blue-400 mr-2" />
              <span className="text-base md:text-lg font-semibold">RAFSIA Assessment</span>
            </div>
            <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto md:mx-0">
              A comprehensive framework for evaluating readiness for satellite internet
              adoption in institutions and service providers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li>
                <Link href="/survey" className="hover:text-white transition-colors inline-block py-1">
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors inline-block py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors inline-block py-1">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h4>
            <p className="text-sm md:text-base text-gray-400 max-w-sm mx-auto md:mx-0">
              For questions about this assessment tool or research inquiries,
              please contact the research team.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-xs md:text-sm px-4">
            © 2025 RAFSIA Assessment Tool. All rights reserved.Made With Love by Mike.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;