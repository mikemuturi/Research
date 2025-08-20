import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            <h2>Data Collection and Purpose</h2>
            <p>
              The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool 
              collects information to assess the readiness of institutions and service providers 
              for satellite internet adoption. This research is conducted to understand and improve 
              connectivity solutions in underserved areas.
            </p>

            <h3>Information We Collect</h3>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number (optional, can be submitted anonymously)</li>
              <li><strong>Professional Information:</strong> Role, institution name, county</li>
              <li><strong>Assessment Responses:</strong> Your ratings and answers to readiness assessment questions</li>
              <li><strong>Technical Information:</strong> IP address, submission timestamp</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <ul>
              <li>To generate your personalized readiness assessment report</li>
              <li>To conduct research on satellite internet adoption readiness</li>
              <li>To create aggregate statistics and insights (anonymized)</li>
              <li>To improve the assessment tool and methodology</li>
              <li>To provide recommendations for improving readiness</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information including 
              encrypted data transmission, secure database storage, access controls, and regular security assessments.
            </p>

            <h3>Your Rights</h3>
            <p>
              You have the right to access, correct, delete, withdraw consent, and request portability of your personal information. 
              You can also choose to submit your assessment anonymously.
            </p>

            <h3>Contact Information</h3>
            <p>
              For questions about this privacy policy or to exercise your rights, please contact the RAFSIA research team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;